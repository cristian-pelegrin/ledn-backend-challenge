import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   balance: { type: Number, required: true, min: 0 },
   updatedAt: { type: Date, required: true }
})

export const AccountModel = mongoose.model("Account", accountSchema)