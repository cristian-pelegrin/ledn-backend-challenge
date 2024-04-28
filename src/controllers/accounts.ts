import { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from "http-status-codes"

import { findAccountById } from '@services/account'

export const getAccountById = async (req: Request<{ id: string}>, resp: Response)  => {
  try {
     const account = await findAccountById(req.params.id)
     if (!account) {
        return resp.status(StatusCodes.NOT_FOUND).send(getReasonPhrase(StatusCodes.NOT_FOUND))
     }
     return resp.status(StatusCodes.OK).json({
        id: account.id,
        email: account.email,
        balance: account.balance,
        updatedAt: account.updatedAt
     })
  } catch (e) {
     console.error("Error in getAccountById", e)
     return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  }
}