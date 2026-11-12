import { Router } from 'express'
import {
    createVehicleCategory,
    updateVehicleCategory,
    deleteVehicleCategory,
    getVehicleCategories,
} from '../controller/VehicleCategoryController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    createVehicleCategory
)

router.put(
    '/:vehicleCategoryId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    updateVehicleCategory
)

router.delete(
    '/:vehicleCategoryId',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE'),
    deleteVehicleCategory
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE', 'CUSTOMER'),
    getVehicleCategories
)

export default router
