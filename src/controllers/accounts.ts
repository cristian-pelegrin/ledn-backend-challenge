import { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from "http-status-codes"

export const getAccountById = (req: Request<{ id: string}>, resp: Response)  => {
  try {
     console.log(req.params.id)
     
     resp.status(StatusCodes.OK).json({ account: req.params.id })
  } catch (e) {
     console.log("Error in getAccountById", e)
     resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  }
}