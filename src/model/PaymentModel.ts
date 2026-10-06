import { Schema, model, Document, Types } from 'mongoose'

interface IPayment extends Document {
    bookingId: Types.ObjectId
    userId: Types.ObjectId
    amount: number
    paymentMethod: 'CASH' | 'CARD' | 'ONLINE'
    transactionId: string
    paymentDate: Date
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
}

const paymentSchema = new Schema<IPayment>(
    {
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        paymentMethod: {
            type: String,
            enum: ['CASH', 'CARD', 'ONLINE'],
            required: true
        },
        transactionId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        paymentDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
            required: true,
            default: 'PENDING'
        }
    },
    {
        timestamps: true
    }
)

const PaymentModel = model<IPayment>('Payment', paymentSchema)

export default PaymentModel