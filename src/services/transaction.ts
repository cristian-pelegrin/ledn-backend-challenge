import { TransactionModel, TransactionType } from '@models/transaction'

export const newTransaction = async (args: {
   accountId: String,
   type: TransactionType,
   amount: Number
}) => {
   const transaction = new TransactionModel({
      account: args.accountId,
      type: args.type,
      amount: args.amount,
      createdAt: new Date()
   })
   
   return transaction.save()
}