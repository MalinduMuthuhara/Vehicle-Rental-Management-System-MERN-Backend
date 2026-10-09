import{Request , Response} from 'express'
import VehicleDocumentModel from '../model/VehicleDocumentModel'

//POST /api/vehicledocuments
export const createVehicleDocument = async(req:Request , res:Response) => {
    try{
        const{vehicleId,documentType , documentNumber , issueDate , expiryDate , fileUrl , status} = req.body
        if(!vehicleId || !documentType || !documentNumber || !issueDate || !fileUrl || ! status){
            return res.status(400).json({
                message:'Please Fill All Fields',
            })
        }
        const vehicledocument = await VehicleDocumentModel.create({vehicleId,documentType , documentNumber , issueDate , expiryDate , fileUrl , status})
        return res.status(201).json({
            message:'Vehicle Document Created Successfully',
            body:vehicledocument
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Create Vehicle Document',
            error
        })
    }
}

//PUT /api/vehicledocuments/:vehicleDocumentId
export const updateVehicleDocument = async(req:Request , res:Response) => {
    try{
        const{vehicleId,documentType , documentNumber , issueDate , expiryDate , fileUrl , status} = req.body
        const vehicledocument = await VehicleDocumentModel.findByIdAndUpdate(
            req.params.vehicleDocumentId,
            {vehicleId,documentType , documentNumber , issueDate , expiryDate , fileUrl , status},
            {new:true , runValidators:true}
        )
        if(!vehicledocument){
            return res.status(404).json({
                message:'Vehicle Document Not Found ',
            })
        }

        return res.status(200).json({
            message:'Vehicle Document Updated Successfully',
            body:vehicledocument
        })
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Update Vehicle Document',
            error
        })
    }
}

//DELETE /api/vehicledocuments/:vehicleDocumentId
export const deleteVehicleDocument = async(req:Request , res:Response) => {
    try{
        const vehicledocument = await VehicleDocumentModel.findByIdAndDelete(req.params.vehicleDocumentId)
        if(!vehicledocument){
            return res.status(404).json({
                message:'Vehicle Document Not Found',
            })
        }

        return res.status(200).json({
            message:'Vehicle Document Deleted Successfully',
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Delete Vehicle Document',
            error
        })
    }
}

//GET /api/vehicledocuments
export const getVehicleDocuments = async(req:Request , res:Response) => {
    try{
        const vehicledocuments = await VehicleDocumentModel.find().sort({
            createdAt:-1
        })
        return res.status(200).json(vehicledocuments)

    }catch(error){
        return res.status(500).json({
            message:'Failed To Fetch Vehicle Document Data',
            error
        })
    }
}