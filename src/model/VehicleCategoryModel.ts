import { Schema, model, Document } from 'mongoose'

interface IVehicleCategory extends Document {
    categoryName: string
    description: string
    baseDailyRate: number
    status: 'ACTIVE' | 'INACTIVE'
}

const vehicleCategorySchema = new Schema<IVehicleCategory>(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        baseDailyRate: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            required: true,
            default: 'ACTIVE'
        }
    },
    {
        timestamps: true
    }
)

const VehicleCategoryModel = model<IVehicleCategory>('VehicleCategory',vehicleCategorySchema)
export default VehicleCategoryModel

