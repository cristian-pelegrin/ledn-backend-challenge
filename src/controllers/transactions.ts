import { Request, Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { getDbConnection } from '@clients/mongodb'
import { TransactionType } from '@models/transaction'
import { findAccountById, updateAccountBalance } from '@services/account'
import { newTransaction } from '@services/transaction'

const newAccountBalance = (
 accBalance: number,
 txType: TransactionType,
 txAmount: number
) => {
   const multiplier = txType === TransactionType.Send ? -1 : 1
   return accBalance + (multiplier * txAmount)
}

export const createTransaction = async (
    req: Request<any, any, { accountId: string, type: TransactionType, amount: number }>,
    resp: Response
)  => {
   const dbSession = await getDbConnection().startSession()
   try {
      const {
         body: { accountId, type, amount }
      } = req
      dbSession.startTransaction()
      const account = await findAccountById(accountId)
      if (!account) {
         await dbSession.abortTransaction()
         return resp.status(StatusCodes.NOT_FOUND).send("Account not found")
      }
      
      const newAccBalance = newAccountBalance(
         account!.balance, type, amount)
      if (newAccBalance < 0) {
         await dbSession.abortTransaction()
         return resp.status(StatusCodes.BAD_REQUEST).send("Insufficient account balance")
      }
      
      await updateAccountBalance({ accountId, balance: newAccBalance })
      const newTx = await newTransaction({ accountId, type, amount })
      await dbSession.commitTransaction()
      
      return resp.status(StatusCodes.OK).json({
         id: newTx._id,
         type: newTx.type,
         amount: newTx.amount,
         createdAt: newTx.createdAt
      })
   } catch (e) {
      await dbSession.abortTransaction()
      console.error("Error in createTransaction", e)
      return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
   } finally {
      await dbSession.endSession()
   }
}