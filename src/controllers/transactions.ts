import { Request, Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export const createTransaction = (
    req: Request<{ accountId: string}, any, { type: string, amount: number }>,
    resp: Response
)  => {
   try {
      console.log("params", req.params)
      console.log("body", req.body)
      
      resp.status(StatusCodes.OK).json({ account: req.params.accountId })
   } catch (e) {
      console.log("Error in createTransaction", e)
      resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
   }
}