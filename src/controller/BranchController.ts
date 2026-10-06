import{ Request , Response} from 'express'
import BranchModel from '../model/BranchModel'

// POST /api/branches
export const createBranch = async (req:Request , res:Response) => {

    try{

        const{branchName , address , city , contactNumber , email , status} = req.body

        if(!branchName || !address || !city ||!contactNumber || !email || !status){
            return res.status(400).json({
                message :'Please Fill All The Fields',
            })
        }

        const branch = await BranchModel.create({branchName , address , city , contactNumber , email , status})
         
        return res.status(201).json({
            message : "Branch Created Successfully",
            body : branch
        })

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Create Branch',
            error
        })
    }
}

//PUT /api/branches/:branchId
export const updateBranch = async (req:Request , res:Response) => {

    try{
        const{branchName , address , city , contactNumber , email , status} = req.body
        const branch = await BranchModel.findByIdAndUpdate(
            req.params.branchId,
            {branchName , address , city , contactNumber , email , status},
            {new:true , runValidators:true}
        )

        if(!branch){
            return res.status(404).json({
                message : 'Branch Not Found',
            })
        }
        return res.status(200).json({
            message :'Branch Updated Successfully',
            body:branch
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Update Branch',
            error
        })
    }
}

// DELETE /api/branches/:branchId
export const deleteBranch = async (req:Request , res:Response) => {

    try{
        const branch = await BranchModel.findByIdAndDelete(req.params.branchId)
        if(!branch){
            return res.status(404).json({
                message : "Branch Not Found",
            })
        }
        return res.status(200).json({
            message : "Branch Deleted Successfully",
        })
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Delete Branch',
            error
        })
    }
}

//GET /api/getBranches
export const getBranches = async(req :Request , res:Response) => {

    try{
        const branches = await BranchModel.find().sort({
            createdAt : -1
        })
        return res.status(200).json(branches)
    }catch(error){
        return res.status(500).json({
            message : 'Failed Fetch Branch Data',
            error
        })
    }
}