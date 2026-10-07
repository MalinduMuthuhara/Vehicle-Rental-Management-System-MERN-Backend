import { Schema, model, Document, Types } from 'mongoose'

interface IVehicleMaintenance extends Document {
    vehicleId: Types.ObjectId
    maintenanceType: 'ROUTINE' | 'REPAIR' | 'INSPECTION'
    description: string
    serviceDate: Date
    cost: number
    serviceProvider: string
    nextServiceDate?: Date
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
}

const vehicleMaintenanceSchema = new Schema<IVehicleMaintenance>(
    {
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        maintenanceType: {
            type: String,
            enum: ['ROUTINE', 'REPAIR', 'INSPECTION'],
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        serviceDate: {
            type: Date,
            required: true
        },
        cost: {
            type: Number,
            required: true,
            min: 0
        },
        serviceProvider: {
            type: String,
            required: true,
            trim: true
        },
        nextServiceDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
            required: true,
            default: 'SCHEDULED'
        }
    },
    {
        timestamps: true
    }
)

const VehicleMaintenanceModel = model<IVehicleMaintenance>(
    'VehicleMaintenance',
    vehicleMaintenanceSchema
)

export default VehicleMaintenanceModel

