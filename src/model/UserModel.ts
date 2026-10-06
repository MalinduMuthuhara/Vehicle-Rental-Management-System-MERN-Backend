
import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
    userName: string
    email: string
    password: string
    contactNumber: string
    address: string
    role: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}

const userSchema = new Schema<IUser>(
    {
        userName: {
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
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ['CUSTOMER', 'EMPLOYEE', 'ADMIN'],
            required: true,
            default: 'CUSTOMER'
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
            required: true,
            default: 'ACTIVE'
        }
    },
    {
        timestamps: true
    }
)

const UserModel = model<IUser>('User', userSchema)

export default UserModel