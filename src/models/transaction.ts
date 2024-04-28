import mongoose from "mongoose"

export enum TransactionType {
   Receive = 'receive',
   Send = 'send'
}

const transactionSchema = new mongoose.Schema({
   account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
   type: { type: String, required: true, enum: Object.values(TransactionType) },
   amount: { type: Number, required: true, min: 0 },
   createdAt: { type: Date, required: true }
})

export const TransactionModel = mongoose.model("Transaction", transactionSchema)