import { Router } from 'express'
import {
    createBranch,
    updateBranch,
    deleteBranch,
    getBranches,
} from '../controller/BranchController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    createBranch
)

router.put(
    '/:branchId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    updateBranch
)

router.delete(
    '/:branchId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    deleteBranch
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE', 'CUSTOMER'),
    getBranches
)

export default router
