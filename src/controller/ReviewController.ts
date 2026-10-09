import{Request ,Response} from 'express'
import ReviewModel from '../model/ReviewModel'

//POST /api/reviews
export const createReview = async(req:Request , res:Response)=>{
    try{
        const{userId , vehicleId , bookingId ,rating , comment , reviewDate ,status} = req.body
        if(!userId || !vehicleId || !bookingId || typeof rating !== 'number' ||rating > 5 || rating < 1 || !Number.isInteger(rating) ||!comment?.trim() || !reviewDate || !status){
            return res.status(400).json({
                message:'Please Fill All Feilds',
            })
        }
        const review = await ReviewModel.create({userId , vehicleId , bookingId ,rating , comment , reviewDate ,status})
        return res.status(201).json({
            message:'Review Created Successfully',
            body:review
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Create Review',
            error
        })
    }
}

//PUT /api/reviews/:reviewId
export const updateReview = async(req:Request , res:Response) => {
    try{
        const{userId , vehicleId , bookingId ,rating , comment , reviewDate ,status} = req.body
        const review = await ReviewModel.findByIdAndUpdate(
            req.params.reviewId,
            {userId , vehicleId , bookingId ,rating , comment , reviewDate ,status},
            {new:true , runValidators:true}

        )
        if(!review){
            return res.status(404).json({
                message : 'Review Not Found',
            })
        }
        return res.status(200).json({
            message:'Review Updated Successfully',
            body:review
        })

    }catch(error){
        return res.status(500).json({
            message:'Failed To Update Review',
            error
        })
    }
}

//DLETE /api/reviews/:reviewId
export const deleteReview = async(req:Request , res:Response) => {
    try{
        const review = await ReviewModel.findByIdAndDelete(req.params.reviewId)
        if(!review){
            return res.status(404).json({
                message:'Review Not Found',
            })
        }

        return res.status(200).json({
            message:'Review Deleted Successfully',
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Delete Review',
            error
        })
    }
}

//GET /api/reviews
export const getReviews = async(req:Request , res:Response) => {
    try{
        const reviews = await ReviewModel.find().sort({
            createdAt:-1
        })

        return res.status(200).json(reviews)
    }catch(error){
        return res.status(500).json({
            message:'Failed To Fetch REview Data',
            error
        })
    }
}
