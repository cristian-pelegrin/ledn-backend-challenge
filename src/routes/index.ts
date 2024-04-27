import { Express } from "express"

import accounts from "@routes/accounts"
import transactions from "@routes/transactions"

export const loadRoutes = (app: Express) => {
   app.use("/accounts", accounts)
   app.use("/transactions", transactions)
}