import{Router} from 'express'
import{
    createVehicleMaintenance,
    updateVehicleMaintenance,
    deleteVehicleMaintenance,
    getVehicleMaintenances,

} from '../controller/VehicleMaintenanceController'

const router = Router()

router.post('/' , createVehicleMaintenance)
router.put('/:vehicleMaintenanceId' , updateVehicleMaintenance)
router.delete('/:vehicleMaintenanceId' , deleteVehicleMaintenance)
router.get('/' , getVehicleMaintenances)

export default router 