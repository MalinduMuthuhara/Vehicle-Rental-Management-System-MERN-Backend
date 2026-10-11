import { Schema, model, Types } from 'mongoose'

interface IBooking {
    userId: Types.ObjectId
    vehicleId: Types.ObjectId
    pickupBranchId: Types.ObjectId
    returnBranchId: Types.ObjectId
    pickupDate: Date
    returnDate: Date
    totalAmount: number
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
    notes?: string
}

const bookingSchema = new Schema<IBooking>(
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
        pickupBranchId: {
            type: Schema.Types.ObjectId,
            ref: 'Branch',
            required: true
        },
        returnBranchId: {
            type: Schema.Types.ObjectId,
            ref: 'Branch',
            required: true
        },
        pickupDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (this: any, value: Date) {
                    if (!this.pickupDate || !value) {
                        return true
                    }

                    return value.getTime() > new Date(this.pickupDate).getTime()
                },
                message: 'Return date must be after pickup date'
            }
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
            required: true,
            default: 'PENDING'
        },
        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const BookingModel = model<IBooking>('Booking', bookingSchema)

export default BookingModel
