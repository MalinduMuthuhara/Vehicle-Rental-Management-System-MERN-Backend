import { Router } from 'express'
import {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicles,
} from '../controller/VehicleController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    createVehicle
)

router.put(
    '/:vehicleId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    updateVehicle
)

router.delete(
    '/:vehicleId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    deleteVehicle
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE', 'CUSTOMER'),
    getVehicles
)

export default router
