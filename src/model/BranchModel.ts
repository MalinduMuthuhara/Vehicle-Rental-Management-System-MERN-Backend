import { Schema, model, Document } from 'mongoose'

interface IBranch extends Document {
    branchName: string
    address: string
    city: string
    contactNumber: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
}

const branchSchema = new Schema<IBranch>(
    {
        branchName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
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

const BranchModel = model<IBranch>('Branch', branchSchema)

export default BranchModel

