
import { Schema, model, Document, Types } from 'mongoose'

interface IReview extends Document {
    userId: Types.ObjectId
    vehicleId: Types.ObjectId
    bookingId: Types.ObjectId
    rating: number
    comment: string
    reviewDate: Date
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const reviewSchema = new Schema<IReview>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        reviewDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED'],
            required: true,
            default: 'PENDING'
        }
    },
    {
        timestamps: true
    }
)

const ReviewModel = model<IReview>('Review', reviewSchema)

export default ReviewModel