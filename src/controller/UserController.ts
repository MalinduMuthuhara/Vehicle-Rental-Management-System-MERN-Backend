import { Request, Response } from 'express'
import UserModel from '../model/UserModel'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const USER_ROLES = ['CUSTOMER', 'EMPLOYEE', 'ADMIN'] as const

// Safe response - Never return password
const getSafeUser = (user: any) => ({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address,
    role: user.role,
    status: user.status
})

// Common user creation function
const saveUser = async (
    req: Request,
    res: Response,
    role: typeof USER_ROLES[number]
) => {
    try {
        const {
            userName,
            email,
            password,
            contactNumber,
            address
        } = req.body

        if (!userName || !email || !password || !contactNumber || !address) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({
                message: 'Password Should Contain At Least 8 Characters'
            })
        }

        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            return res.status(409).json({
                message: 'Email Already Exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await UserModel.create({
            userName,
            email,
            password: hashedPassword,
            contactNumber,
            address,
            role
        })

        return res.status(201).json({
            message: 'User Saved Successfully',
            body: getSafeUser(user)
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Email Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Create User'
        })
    }
}

// PUBLIC REGISTRATION
// Anyone can register, but role is ALWAYS CUSTOMER
export const registerUser = async (req: Request, res: Response) => {
    return saveUser(req, res, 'CUSTOMER')
}

// ADMIN ONLY - CREATE USER
// ADMIN can create CUSTOMER, EMPLOYEE or ADMIN accounts
export const createUser = async (req: Request, res: Response) => {
    const { role } = req.body

    if (role !== undefined && !USER_ROLES.includes(role)) {
        return res.status(400).json({
            message: 'Invalid User Role'
        })
    }

    return saveUser(req, res, role || 'CUSTOMER')
}

// UPDATE USER - ADMIN ONLY
export const updateUser = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.userId)) {
            return res.status(400).json({
                message: 'Invalid User ID'
            })
        }

        const {
            userName,
            email,
            password,
            contactNumber,
            address,
            role,
            status
        } = req.body

        // Protected fields cannot be updated through this API
        if (
            password !== undefined ||
            role !== undefined ||
            status !== undefined
        ) {
            return res.status(403).json({
                message: 'You Cannot Update Protected Fields'
            })
        }

        const user = await UserModel.findById(req.params.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found'
            })
        }

        if (userName !== undefined) user.userName = userName
        if (email !== undefined) user.email = email
        if (contactNumber !== undefined) user.contactNumber = contactNumber
        if (address !== undefined) user.address = address

        await user.save()

        return res.status(200).json({
            message: 'User Updated Successfully',
            body: getSafeUser(user)
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Email Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Update User'
        })
    }
}

// DELETE USER - ADMIN ONLY
export const deleteUser = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.userId)) {
            return res.status(400).json({
                message: 'Invalid User ID'
            })
        }

        const user = await UserModel.findByIdAndDelete(req.params.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found'
            })
        }

        return res.status(200).json({
            message: 'User Deleted Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete User'
        })
    }
}

// GET ALL USERS - ADMIN ONLY
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()
            .select('-password')//DataBase Query ekenma password dena eka nawath thanawa
            .sort({ createdAt: -1 })

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Users'
        })
    }
}
