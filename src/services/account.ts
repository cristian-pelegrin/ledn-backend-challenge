import { AccountModel } from "@models/account"

export const findAccountById = async(id: String)  => {
   return AccountModel.findById(id)
}

export const updateAccountBalance = (args: { accountId: String, balance: number }) => {
   return AccountModel.updateOne(
      { _id: args.accountId },
      { balance:  args.balance, updatedAt: new Date() }
    )
}