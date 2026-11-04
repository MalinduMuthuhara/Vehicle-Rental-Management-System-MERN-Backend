
import { Schema, model, Document, Types } from 'mongoose'

interface IVehicleDocument extends Document {
    vehicleId: Types.ObjectId
    documentType: 'REGISTRATION' | 'INSURANCE' | 'LICENSE'
    documentNumber: string
    issueDate: Date
    expiryDate?: Date
    fileUrl: string
    status: 'VALID' | 'EXPIRING' | 'EXPIRED' | 'INVALID'
}

const vehicleDocumentSchema = new Schema<IVehicleDocument>(
    {
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        documentType: {
            type: String,
            enum: ['REGISTRATION', 'INSURANCE', 'LICENSE'],
            required: true
        },
        documentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        issueDate: {
            type: Date,
            required: true
        },
        expiryDate: {
            type: Date,
            required: false
        },
        fileUrl: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ['VALID', 'EXPIRING', 'EXPIRED', 'INVALID'],
            required: true,
            default: 'VALID'
        }
    },
    {
        timestamps: true
    }
)

const VehicleDocumentModel = model<IVehicleDocument>('VehicleDocument',vehicleDocumentSchema)

export default VehicleDocumentModel