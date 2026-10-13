import { Request, Response } from 'express'
import DamageReportModel from '../model/DamageReportModel'

// POST /api/damage-reports
export const createDamageReport = async (req:Request , res:Response) => {
    try {
        const { rentalId , vehicleId , reportedBy , damageType , description , damageDate , estimatedCost , repairCost , photoUrls , status } = req.body
        if (!rentalId || !vehicleId || !reportedBy || !damageType || !description || !damageDate || estimatedCost === undefined) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        const damageReport = await DamageReportModel.create({ rentalId, vehicleId, reportedBy, damageType, description, damageDate, estimatedCost, repairCost, photoUrls, status })

        return res.status(201).json({
            message: 'Damage Report Created Successfully',
            body: damageReport
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Create Damage Report',
            error
        })
    }
}

//PUT /api/damage-reports/:damageReportId
export const updateDamageReport = async(req:Request , res:Response) => {
    try{
        const {rentalId , vehicleId , reportedBy , damageType , description , damageDate , estimatedCost , repairCost , photoUrls , status} = req.body
        const damageReport = await DamageReportModel.findByIdAndUpdate(
            req.params.damageReportId,
            {rentalId , vehicleId , reportedBy , damageType , description , damageDate , estimatedCost , repairCost , photoUrls , status},
            {new:true , runValidators:true}
        )
        if(!damageReport){
            return res.status(404).json({
                message:'Damage Report Not Found',
            })
        }
        return res.status(200).json({
            message:'Damage Report Updated Successfully',
            body:damageReport
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Update Damage Report',
            error
        })
    }
}

//DELETE /api/damage-reports/:damageReportId
export const deleteDamageReport = async(req:Request , res:Response) => {
    try{
        const damageReport = await DamageReportModel.findByIdAndDelete(req.params.damageReportId)
        if(!damageReport){
            return res.status(404).json({
                message:'Damage Report Not Found',
            })
        }
        return  res.status(200).json({
            message:'Damage Report Deleted Successfully',
        })
    }catch (error){
        return res.status(500).json({
            message:'Failed To Delete Damage Report',
            error
        })
    }
}

//GET /api/damage-reports
export const getDamageReports = async (req:Request , res:Response) => {
    try{
        const damageReports = await DamageReportModel.find().sort({
            createdAt : -1
        })
        return res.status(200).json(damageReports)
    }catch (error){
        return res.status(500).json({
            message:'Failed To Fetch DamageReports Data',
            error
        })
    }
}