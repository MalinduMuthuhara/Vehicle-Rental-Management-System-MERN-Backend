import{Router} from 'express'
import{
    createBooking,
    updateBooking,
    deleteBooking,
    getBookings,
}from '../controller/BookingController'

const router = Router()

router.post('/' , createBooking)
router.put('/:bookingId', updateBooking)
router.delete('/:bookingId', deleteBooking)
router.get('/' , getBookings)

export default router