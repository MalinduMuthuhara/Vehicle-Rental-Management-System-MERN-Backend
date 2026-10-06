import{Request , Response} from 'express'
import PaymentModel from '../model/PaymentModel'

// POST /api/payments
export const createPayment = async (req:Request , res:Response) =>{
    try{
        const{bookingId , userId , amount , paymentMethod , transactionId , paymentDate , status} = req.body
        if(!bookingId || !userId || amount == null || amount <= 0 || !paymentMethod || !transactionId || !paymentDate || !status){
            return res.status(400).json({
                message:'Please Fill All Fields',
            })
        }
        const payment = await PaymentModel.create({bookingId , userId , amount , paymentMethod , transactionId , paymentDate , status})
        return res.status(201).json({
            message:'Payment Created Successfully',
            body:payment
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Create Payment',
            error
        })
    }
}

// PUT /api/updatePayment/:paymentId
export const updatePayment = async(req:Request , res:Response) => {

    try{
       const{bookingId , userId , amount , paymentMethod , transactionId , paymentDate , status} = req.body 
       const payment = await PaymentModel.findByIdAndUpdate(
            req.params.paymentId,
            {bookingId , userId , amount , paymentMethod , transactionId , paymentDate , status},
            {new:true , runValidators:true}
        )

       if(!payment){
            return res.status(404).json({
                message:'Payment Not Found',
            })
        }

        return res.status(200).json({
            message:'Payment Updated Successfully',
            body:payment
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Update Payment',
            error
        })
    }
}

// DELETE /api/payments/:paymentId
export const deletePayment = async(req:Request , res:Response) => {

    try{
        const payment = await PaymentModel.findByIdAndDelete(req.params.paymentId)
        if(!payment){
            return res.status(404).json({
                message:'Payment Not Found',
            })
        }
        return res.status(200).json({
            message:'Payment Deleted Successfully',
        })
    }catch(error){
        return res.status(500).json({
            message:'Failed To Delete Payment',
            error
        })
    }
}

// GET /api/payments/
export const getPayments = async(req:Request, res:Response) => {
    try{
        const payments = await PaymentModel.find().sort({
            createdAt:-1
        })

        return res.status(200).json(payments)

    }catch(error){
        return res.status(500).json({
            message:'Failed To Fetch Payment Data',
            error
        })
    }
}