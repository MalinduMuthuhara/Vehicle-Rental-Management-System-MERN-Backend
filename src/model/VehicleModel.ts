
import { Schema, model, Types } from 'mongoose'

interface IVehicle {
    registrationNumber: string
    brand: string
    model: string
    year: number
    color: string
    transmission: 'AUTOMATIC' | 'MANUAL'
    fuelType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC'
    seatingCapacity: number
    dailyRate: number
    status: 'AVAILABLE' | 'BOOKED' | 'RENTED' | 'MAINTENANCE' | 'INACTIVE'
    categoryId: Types.ObjectId
    branchId: Types.ObjectId
}

const vehicleSchema = new Schema<IVehicle>(
    {
        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        model: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: Number,
            required: true,
            min: 1900,
            max: new Date().getFullYear() + 1
        },
        color: {
            type: String,
            required: true,
            trim: true
        },
        transmission: {
            type: String,
            enum: ['AUTOMATIC', 'MANUAL'],
            required: true
        },
        fuelType: {
            type: String,
            enum: ['PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC'],
            required: true
        },
        seatingCapacity: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: 'Seating capacity must be an integer'
            }
        },
        dailyRate: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: [
                'AVAILABLE',
                'BOOKED',
                'RENTED',
                'MAINTENANCE',
                'INACTIVE'
            ],
            required: true,
            default: 'AVAILABLE'
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'VehicleCategory',
            required: true
        },
        branchId: {
            type: Schema.Types.ObjectId,
            ref: 'Branch',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const VehicleModel = model<IVehicle>('Vehicle', vehicleSchema)

export default VehicleModel
