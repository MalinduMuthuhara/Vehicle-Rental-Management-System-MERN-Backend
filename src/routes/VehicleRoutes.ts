import{Router} from 'express'
import{
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicles,
} from '../controller/VehicleController'

const router = Router()

router.post('/' , createVehicle)
router.put('/:vehicleId' , updateVehicle)
router.delete('/:vehicleId' ,deleteVehicle )
router.get('/' , getVehicles)

export default router