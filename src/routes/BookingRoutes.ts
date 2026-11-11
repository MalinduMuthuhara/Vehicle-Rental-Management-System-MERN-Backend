import { Router } from 'express'
import {
    createBooking,
    updateBooking,
    deleteBooking,
    getBookings,
} from '../controller/BookingController'

import { authenticateToken } from '../middleware/AuthMiddleware'

const router = Router()

router.post('/', authenticateToken, createBooking)

router.put('/:bookingId', authenticateToken, updateBooking)

router.delete('/:bookingId', authenticateToken, deleteBooking)

router.get('/', authenticateToken, getBookings)

export default router
