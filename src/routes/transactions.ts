import { Router } from "express"
import { body, param } from 'express-validator'

import { requestValidationMw } from '@utils/index'
import { createTransaction } from '@controllers/transactions'

const router = Router()

router.post(
    "/:accountId",
    requestValidationMw([
       param('accountId').isUUID().withMessage('invalid accountId param'),
       body('type').notEmpty().withMessage('invalid body.type'),
       body('amount').isInt({ gt: 0 }).withMessage('invalid body.amount')
    ]),
    createTransaction
)

export default router