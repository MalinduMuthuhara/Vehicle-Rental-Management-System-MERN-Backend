import { Router } from 'express'
import {
    createUser,
    updateUser,
    deleteUser,
    getUsers
} from '../controller/UserController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

// Meka Ona kenekuta Puluwan
router.post('/', createUser)

//put,delete,get ACCESS thiyenne ADMINTA witharay
router.put('/:userId', authenticateToken, authorizeRoles('ADMIN'), updateUser)
router.delete('/:userId', authenticateToken, authorizeRoles('ADMIN'), deleteUser)
router.get('/', authenticateToken, authorizeRoles('ADMIN'), getUsers)

export default router