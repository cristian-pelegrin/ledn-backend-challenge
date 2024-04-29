import { Router } from "express"
import { body } from 'express-validator'

import { requestValidationMw } from '@utils/index'
import { createTransaction } from '@controllers/transactions'
import { TransactionType } from '@models/transaction'

const router = Router()

router.post(
    "/",
    requestValidationMw([
       body('accountId').isMongoId().withMessage('invalid accountId param'),
       body('type').notEmpty().isIn(Object.values(TransactionType)).withMessage('invalid transaction type'),
       body('amount').isInt({ gt: 0 }).withMessage('invalid transaction amount')
    ]),
    createTransaction
)

export default router