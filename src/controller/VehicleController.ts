import { Request, Response } from 'express'
import VehicleModel from '../model/VehicleModel'

// POST /api/vehicles
export const createVehicle = async (req: Request, res: Response) => {
    try {
        const {registrationNumber,brand,model,year,color,transmission,fuelType,seatingCapacity,dailyRate,status,categoryId,branchId } = req.body

        if (!registrationNumber ||!brand ||!model ||!year ||!color ||!transmission ||!fuelType ||!seatingCapacity ||!dailyRate ||!status ||!categoryId ||!branchId) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        const vehicle = await VehicleModel.create({registrationNumber,brand,model,year,color,transmission,fuelType,seatingCapacity,dailyRate,status,categoryId,branchId})

        return res.status(201).json({
            message: 'Vehicle Created Successfully',
            body: vehicle
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Create Vehicle',
            error
        })
    }
}

//PUT /api/vehicles/:vehicleId
export const updateVehicle = async (req:Request , res:Response) => {

    try{
        const {registrationNumber,brand,model,year,color,transmission,fuelType,seatingCapacity,dailyRate,status,categoryId,branchId } = req.body

        const vehicle = await VehicleModel.findByIdAndUpdate(
            req.params.vehicleId,
            {registrationNumber,brand,model,year,color,transmission,fuelType,seatingCapacity,dailyRate,status,categoryId,branchId},
            {new : true , runValidators : true}

        )

        if(!vehicle){
            return res.status(404).json({
                message :'Vehicle Not Found',
            })
        }

        return res.status(200).json({
            message : 'Vehicle Updated Successfully',
            body : vehicle
        })

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Update Vehicle',
            error
        })
    }
}

//DELETE /api/vehicles/:vehicleId
export const deleteVehicle = async (req:Request , res:Response) => {

    try{
        const vehicle = await VehicleModel.findByIdAndDelete(req.params.vehicleId)

        if(!vehicle){
            return res.status(404).json({
                message : 'Can Not Find Vehicle',
            })
        }

        return res.status(200).json({
            message : 'Vehicle Deleted Successfully',
        })

    }catch(error){
        return res.status(500).json({
            message : 'Vehicle Deleted Failed',
            error
        })
    }
}

// GET /api/vehicles
export const getVehicles = async (req:Request , res:Response) => {

    try{
        const vehicles = await VehicleModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(vehicles)
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Fetch Vehicles',
            error
        })
    }
}
