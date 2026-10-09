import{Router} from 'express'
import{
    createVehicleDocument,
    updateVehicleDocument,
    deleteVehicleDocument,
    getVehicleDocuments,
} from '../controller/VehicleDocumentController'

const router = Router()

router.post('/' , createVehicleDocument)
router.put('/:vehicleDocumentId' , updateVehicleDocument)
router.delete('/:vehicleDocumentId' , deleteVehicleDocument)
router.get('/' ,getVehicleDocuments )

export default router