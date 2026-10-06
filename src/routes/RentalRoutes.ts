import{Router} from 'express'
import{
    createRental,
    updateRental,
    deleteRental,
    getRentals,
} from '../controller/RentalController'

const router = Router()

router.post('/', createRental)
router.put('/:rentalId' , updateRental)
router.delete('/:rentalId' , deleteRental)
router.get('/' , getRentals)

export default router