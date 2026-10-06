import { Router } from 'express'
import {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    
} from '../controller/UserController'

const router = Router()


router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.get('/', getUsers)

export default router