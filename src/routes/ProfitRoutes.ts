import { Router } from 'express'
import { getProfit } from '../controller/ProfitController'
import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN'),
    getProfit
)

export default router
