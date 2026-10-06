import { Schema, model, Document, Types } from 'mongoose'

interface IRental extends Document {
    bookingId: Types.ObjectId
    userId: Types.ObjectId
    vehicleId: Types.ObjectId
    pickupDate: Date
    expectedReturnDate: Date
    actualReturnDate?: Date
    startingMileage: number
    endingMileage?: number
    status: 'ONGOING' | 'COMPLETED' | 'CANCELLED'
}

const rentalSchema = new Schema<IRental>(
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
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        pickupDate: {
            type: Date,
            required: true
        },
        expectedReturnDate: {
            type: Date,
            required: true
        },
        actualReturnDate: {
            type: Date,
            default: null
        },
        startingMileage: {
            type: Number,
            required: true,
            min: 0
        },
        endingMileage: {
            type: Number,
            min: 0
        },
        status: {
            type: String,
            enum: ['ONGOING', 'COMPLETED', 'CANCELLED'],
            required: true,
            default: 'ONGOING'
        }
    },
    {
        timestamps: true
    }
)

const RentalModel = model<IRental>('Rental', rentalSchema)

export default RentalModel

