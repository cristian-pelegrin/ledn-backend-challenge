import fs from "fs"
import StreamArray from "stream-json/streamers/StreamArray"
import Batch from "stream-json/utils/Batch"
import 'module-alias/register'

import { connectDB } from '@clients/mongodb'
import { AccountModel } from "@models/account"
import { TransactionModel } from "@models/transaction"
import * as process from 'process'

const BATCH_SIZE = 1000;

type JsonBatch<T> = {
   key: number,
   value: T
}

type AccountSeed = {
   userEmail: string,
   balance: number,
   updatedAt: Date
}

type TransactionSeed = {
   userEmail: string,
   amount: number,
   type: "receive" | "send"
   createdAt: Date | null
}

const processAccounts = async (accounts: JsonBatch<AccountSeed>[]) => {
   for (const { value } of accounts) {
      const existingAccount = await AccountModel.findOne({ email: value.userEmail })
      
      if (!existingAccount) {
         const newAccount = new AccountModel({
            email: value.userEmail,
            balance: value.balance,
            updatedAt: value.updatedAt
         })
         await newAccount.save()
         
         continue
      }
      
      if (existingAccount.updatedAt < new Date(value.updatedAt)) {
         existingAccount.balance = value.balance
         existingAccount.updatedAt = value.updatedAt
         await existingAccount.save()
      }
   }
}

const processTransactions = async (transactions: JsonBatch<TransactionSeed>[]) => {
   for (const { value } of transactions) {
      const existingAccount = await AccountModel.findOne({ email: value.userEmail })
      if (!existingAccount) {
         console.warn("transaction without owner account", value)
         continue
      }
      
      const newTransaction = new TransactionModel({
         account: existingAccount!._id,
         type: value.type,
         amount: value.amount,
         createdAt: value.createdAt || new Date()
      })
      await newTransaction.save()
   }
}

(async () => {
   const dbInstance = await connectDB()
   console.log("cleaning db")
   await dbInstance.db.dropDatabase()
   
   console.log("seeding accounts start")
   const accountPipeline = fs.createReadStream("./seed-data/accounts-api-large.json")
      .pipe(StreamArray.withParser())
      .pipe(new Batch({ batchSize: BATCH_SIZE }))
   
   let accountsProcessed = 0
   accountPipeline.on('data', async data => {
      console.log("processing accounts from", accountsProcessed, "to", data.length + accountsProcessed)
      accountPipeline.pause()
      await processAccounts(data)
      accountsProcessed += data.length
      accountPipeline.resume()
   })
   
   accountPipeline.on('end', async () => {
      console.log("seeding accounts finished")
      console.log("seeding transactions start")
      const txPipeline = fs.createReadStream("./seed-data/transactions-api-large.json")
         .pipe(StreamArray.withParser())
         .pipe(new Batch({ batchSize: BATCH_SIZE }))
      
      let txProcessed = 0
      txPipeline.on('data', async data => {
         console.log("processing transactions from", txProcessed, "to", data.length + txProcessed)
         txPipeline.pause()
         await processTransactions(data)
         txProcessed += data.length
         txPipeline.resume()
      })
      
      txPipeline.on('end', async () => {
         console.log("seeding transactions finished")
         process.exit()
      })
   });
})()
