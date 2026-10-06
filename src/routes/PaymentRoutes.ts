import{Router} from 'express'
import{
    createPayment,
    updatePayment,
    deletePayment,
    getPayments,

} from '../controller/PaymentController'

const router = Router()

router.post('/' , createPayment)
router.put('/:paymentId' , updatePayment)
router.delete('/:paymentId' , deletePayment)
router.get('/' , getPayments)

export default router