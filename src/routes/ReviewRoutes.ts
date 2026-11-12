import { Router } from 'express'
import {
    createReview,
    updateReview,
    deleteReview,
    getReviews,
} from '../controller/ReviewController'

import { authenticateToken } from '../middleware/AuthMiddleware'
import { authorizeRoles } from '../middleware/RoleMiddleware'

const router = Router()

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'CUSTOMER'),
    createReview
)

router.put(
    '/:reviewId',
    authenticateToken,
    authorizeRoles('ADMIN', 'CUSTOMER'),
    updateReview
)

router.delete(
    '/:reviewId',
    authenticateToken,
    authorizeRoles('ADMIN', 'CUSTOMER'),
    deleteReview
)

router.get(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPLOYEE', 'CUSTOMER'),
    getReviews
)

export default router
