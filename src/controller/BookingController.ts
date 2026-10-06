import{ Request , Response} from 'express'
import BookingModel from '../model/BookingModel'

export const createBooking = async (req:Request , res:Response) => {
    try{
        const{userId , vehicleId , pickupBranchId , returnBranchId , pickupDate , returnDate , totalAmount , status , notes} = req.body
        if(!userId || !vehicleId || !pickupBranchId || !returnBranchId || !pickupDate || !returnDate || totalAmount == null || totalAmount<=0 || !status ){
            return res.status(400).json({
                message:'Please Fill All Fields'
            })
        }
        const booking = await BookingModel.create({userId , vehicleId , pickupBranchId , returnBranchId , pickupDate , returnDate , totalAmount , status , notes})
        return res.status(201).json({
            message:'Booking Created Successfully',
            body:booking
        })

    }catch(error){
        return res.status(500).json({
            message:'Failed To Create Booking',
            error
        })
    }
}

// PUT /api/bookings:bookingId
export const updateBooking = async (req:Request , res:Response) => {
    try{
        const{userId , vehicleId , pickupBranchId , returnBranchId , pickupDate , returnDate , totalAmount , status , notes} = req.body
        const booking = await BookingModel.findByIdAndUpdate(
            req.params.bookingId,
            {userId , vehicleId , pickupBranchId , returnBranchId , pickupDate , returnDate , totalAmount , status , notes},
            {new:true , runValidators:true}
        )

        if(!booking){
            return res.status(404).json({
                message : 'Booking Not Found',
            })
        }

        return res.status(200).json({
            message:'Booking Updated Successfully',
            body:booking
        })
        
    }catch(error){
       return res.status(500).json({
            message :'Failed To Update Booking',
            error
       })
    }
}

//DELETE /api/bookings/:bookingId
export const deleteBooking = async (req:Request , res:Response) => {
    try{
        const booking = await BookingModel.findByIdAndDelete(req.params.bookingId)

        if(!booking){
            return res.status(404).json({
                message:'Cant Find Bokking',
            })
        }

        return res.status(200).json({
            message:'Booking Deleted Successfully',
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Delete Booking',
            error
        })
    }
}

// GET /api/bookings
export const getBookings = async (req:Request , res:Response) => {
    try{
        const bookings = await BookingModel.find().sort({
            createdAt:-1
        })

        return res.status(200).json(bookings)

    }catch(error){
        return res.status(500).json({
            message:'Failed To Fetch Booking Data',
            error
        })
    }
}