import { Router } from 'express'

import {
    registerUser,
    createUser,
    updateUser,
    deleteUser,
    getUsers
} from '../controller/UserController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post('/register', registerUser)

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN'),
    createUser
)

router.put(
    '/:userId',
    authenticateToken,
    authorizeRoles('ADMIN'),
    updateUser
)

router.delete(
    '/:userId',
    authenticateToken,
    authorizeRoles('ADMIN'),
    deleteUser
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN'),
    getUsers
)

export default router
