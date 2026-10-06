import{ Router } from 'express'
import{

    createVehicleCategory,
    updateVehicleCategory,
    deleteVehicleCategory,
    getVehicleCategories,

}from '../controller/VehicleCategoryController'

const  router = Router()

router.post('/',createVehicleCategory)
router.put('/:vehicleCategoryId' ,updateVehicleCategory)
router.delete('/:vehicleCategoryId' ,deleteVehicleCategory )
router.get('/' , getVehicleCategories)

export default router