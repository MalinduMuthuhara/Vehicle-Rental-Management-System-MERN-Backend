import{Request , Response} from 'express'
import VehicleMaintenanceModel from '../model/VehicleMaintenanceModel'

//POST /api/vehiclemaintenances
export const createVehicleMaintenance = async(req:Request , res:Response) => {
    try{
        const{vehicleId , maintenanceType , description , serviceDate , cost , serviceProvider , nextServiceDate , status} = req.body
        if(!vehicleId || !maintenanceType || !description || !serviceDate || cost == null || cost<0 || !serviceProvider || !status){
            return res.status(400).json({
                message:'Please Fill All Feields',
            })
        }

        const vehiclemaintenance = await VehicleMaintenanceModel.create({vehicleId , maintenanceType , description , serviceDate , cost , serviceProvider , nextServiceDate , status})
        return res.status(201).json({
            message:'VehicleMaintenance Created Successfully',
            body:vehiclemaintenance
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Create VehicleMaintenance',
            error
        })
    }
}

//PUT /api/vehiclemaintenances/:vehicleMaintenanceId
export const updateVehicleMaintenance = async (req:Request , res:Response) => {
    try{
        const{vehicleId , maintenanceType , description , serviceDate , cost , serviceProvider , nextServiceDate , status} = req.body
        const vehiclemaintenance = await VehicleMaintenanceModel.findByIdAndUpdate(
            req.params.vehicleMaintenanceId,
            {vehicleId , maintenanceType , description , serviceDate , cost , serviceProvider , nextServiceDate , status},
            {new:true , runValidators:true}
        )

        if(!vehiclemaintenance){
            return res.status(404).json({
                message:'VehicleMaintenance Not Found',
            })
        }
        return res.status(200).json({
            message:'VehicleMaintenance Updated Successfully',
            body:vehiclemaintenance
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To UpdateVehicleMaintenance ',
            error
        })
    }
}

//DELETE /api/vehiclemaintenances/:vehicleMaintenanceId
export const deleteVehicleMaintenance = async(req:Request , res:Response) => {
    try{
        const vehiclemaintenance = await VehicleMaintenanceModel.findByIdAndDelete(req.params.vehicleMaintenanceId)
        if(!vehiclemaintenance){
            return res.status(404).json({
                message:'VehicleMaintenance Not Found',
            })
        }
        return res.status(200).json({
            message:'VehicleMaintenance Deleted Successfully',
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Delete VehicleMaintenances',
            error
        })
    }
}

//GET /api/vehiclemaintenances
export const getVehicleMaintenances = async (req:Request , res:Response) => {
    try{
        const vehiclemaintenances = await VehicleMaintenanceModel.find().sort({
            createdAt:-1
        })

        return res.status(200).json(vehiclemaintenances)
    }catch(error){
        return res.status(500).json({
            message:'Failed To Fetch Data',
            error
        })
    }
}