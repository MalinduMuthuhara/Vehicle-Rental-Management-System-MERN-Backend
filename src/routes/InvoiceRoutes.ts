import { Router } from 'express'
import {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoices,
} from '../controller/InvoiceController'

const router = Router()

router.post('/', createInvoice)
router.put('/:invoiceId', updateInvoice)
router.delete('/:invoiceId', deleteInvoice)
router.get('/', getInvoices)

export default router
