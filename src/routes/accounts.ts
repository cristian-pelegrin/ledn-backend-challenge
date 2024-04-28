import { Router } from "express"
import { param } from 'express-validator'

import { getAccountById } from '@controllers/accounts'
import { requestValidationMw } from '@utils/index'

const router = Router()

router.get(
 "/:id",
 requestValidationMw([param('id').isMongoId().withMessage('invalid id param')]),
 getAccountById
)

export default router