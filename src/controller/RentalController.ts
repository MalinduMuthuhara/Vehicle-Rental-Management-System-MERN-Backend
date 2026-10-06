import { Request , Response } from 'express'
import RentalModel from '../model/RentalModel'

//POST /api/rentals
export const createRental = async(req:Request , res:Response) => {

    try{
        const{bookingId , userId , vehicleId , pickupDate , expectedReturnDate , actualReturnDate , startingMileage , endingMileage , status} = req.body
        if(!bookingId || !userId || !vehicleId || !pickupDate || !expectedReturnDate || startingMileage == null || startingMileage < 0 || !status){
            return res.status(400).json({
                message : 'Please Fill All The Feilds',
            })
        }

        const rental = await RentalModel.create({bookingId , userId , vehicleId , pickupDate , expectedReturnDate , actualReturnDate , startingMileage , endingMileage , status})
        return res.status(201).json({
            message : 'Rental Created Successfully',
            body:rental
        })
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Create Rental',
            error
        })
    }
}

// PUT/api/rentals/:rentalId
export const updateRental = async(req:Request , res:Response) => {
    try{
        const{bookingId , userId , vehicleId , pickupDate , expectedReturnDate , actualReturnDate , startingMileage , endingMileage , status} = req.body
        const rental = await RentalModel.findByIdAndUpdate(
            req.params.rentalId,
            {bookingId , userId , vehicleId , pickupDate , expectedReturnDate , actualReturnDate , startingMileage , endingMileage , status},
            {new:true , runValidators:true}
        )

        if(!rental){
            return res.status(404).json({
                message:'Rental Not Found',
            })
        }

        return res.status(200).json({
            message:'Rental Updated Successfully',
            body:rental
        })
    }catch(error){
        return res.status(500).json({
            message : 'Failed To Update Rental',
            error
        })
    }
}

//DELETE /api/rentals/:rentalId
export const deleteRental = async(req:Request , res:Response) => {

    try{
        const rental = await RentalModel.findByIdAndDelete(req.params.rentalId)
        if (!rental) {
            return res.status(404).json({
                message: 'Rental Not Found'
            })
        }

        return res.status(200).json({
            message:'Rental Deleted Successfully',
        })

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Delete Rental',
            error
        })
    }
}

//Get /api/rentals
export const getRentals = async(req:Request , res:Response) =>{

    try{
        const rental = await RentalModel.find().sort({
            createdAt:-1
        })

        return res.status(200).json(rental)

    }catch(error){
        return res.status(500).json({
            message : 'Failed To Fetch Rental Data',
            error
        })
    }
}