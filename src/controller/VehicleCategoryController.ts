import {Request , Response} from 'express'
import VehicleCategoryModel from '../model/VehicleCategoryModel'

//POST /api/vehiclecategories
export const createVehicleCategory = async(req:Request , res:Response) => {

    try{
        const{categoryName , description , baseDailyRate , status} = req.body
        if(!categoryName || !description ||  baseDailyRate == null || !status){
            return res.status(400).json({
                message :'Please Fill All The Fields',
            })
        }

        const vehiclecategory = await VehicleCategoryModel.create({categoryName , description , baseDailyRate , status})
        return res.status(201).json({
            message : 'Vehicle Category Created Successfully',
            body :vehiclecategory
        })


    }catch(error){
        return res.status(500).json({
            message : 'Failed To Create VehicleCategory',
            error
        })
    }
}

// PUT /api/vehiclecategories/:vehicleCategoryId
export const updateVehicleCategory = async (req:Request , res:Response) => {

    try{

        const{categoryName , description , baseDailyRate , status} = req.body

        const vehicleCategory = await VehicleCategoryModel.findByIdAndUpdate(
            req.params.vehicleCategoryId,
            {categoryName , description , baseDailyRate , status},
            {new : true , runValidators : true}
        )

        if(!vehicleCategory){
            return res.status(404).json({
                message : 'Vehicle Category Not Found',
            })
        }

        return res.status(200).json({
            message : 'Vehicle Category Updated Successfully',
            body :vehicleCategory
        })

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Update Vehicle Category',
            error
        })
    }
}

// DLETE /api/vehiclecategories/:vehicleCategoryId
export const deleteVehicleCategory = async (req:Request , res:Response) => {

    try{

        const vehicleCategory = await VehicleCategoryModel.findByIdAndDelete(req.params.vehicleCategoryId)

        if(!vehicleCategory){
            return res.status(404).json({
                message : 'Vehicle Category Not Found',
            })
        }

        return res.status(200).json({
            message :'Vehicle Category Deleted Successfully',
        })

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Delte Vehicle Category',
            error
        })
    }
}

// GET /api/vehiclecategories
export const getVehicleCategories = async(req:Request , res:Response) => {

    try{
        const vehicleCategory = await VehicleCategoryModel.find().sort({
            createdAt : -1
        })

        return res.status(200).json(vehicleCategory)
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Fetch Vehicle Categories',
            error
        })
    }
}