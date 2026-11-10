import { Router } from 'express'
import { loginUser } from '../controller/AuthController'

const router = Router()

router.post('/login', loginUser)

export default router