import { Router } from 'express'
import {
    createPayment,
    updatePayment,
    deletePayment,
    getPayments,
} from '../controller/PaymentController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    createPayment
)

router.put(
    '/:paymentId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    updatePayment
)


router.delete(
    '/:paymentId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    deletePayment
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE', 'CUSTOMER'),
    getPayments
)

export default router
