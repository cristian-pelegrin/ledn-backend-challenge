import { AccountModel } from "@models/account"

export const findAccountById = async(id: String)  => {
   return AccountModel.findById(id)
}