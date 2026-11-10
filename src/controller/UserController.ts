import { Request, Response } from 'express'
import UserModel from '../model/UserModel'
import bcrypt from 'bcrypt'

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email , password , contactNumber , address} = req.body

        if (!userName || !email || !password || !contactNumber || !address) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        if(typeof password !== "string" || password.length < 8){
            return res.status(400).json({
                message:'Password Should Contain At Least 8 Characters',
            })
        }

        const existUser = await UserModel.findOne({email})
        if(existUser){
            return res.status(409).json({
                message:'Email Already Exist',
            })
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = await UserModel.create({ userName , email , password:hashedPassword , contactNumber , address})

        return res.status(201).json({
            message: 'User Saved Successfully',
            body:{
                _id: user._id,
                userName: user.userName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
                role: user.role,
                status: user.status
            }
        })
    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Email Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Create User',
            error
        })
    }
}

// PUT /api/users/:userId
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userName, email , password , contactNumber , address , role, status } = req.body
        if(password!==undefined || role!==undefined || status!==undefined){
            return res.status(403).json({
                message:'You Cant Update Protected Fields',
            })
        }

        const user = await UserModel.findById(req.params.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            })
        }
        //Update ONly Allow Feilds
        if (userName !== undefined) user.userName = userName
        if (email !== undefined) user.email = email
        if (contactNumber !== undefined) user.contactNumber = contactNumber
        if (address !== undefined) user.address = address

        await user.save()

        return res.status(200).json({
            message: 'User Updated Successfully',
            body:{
                _id: user._id,
                userName: user.userName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
                role: user.role,
                status: user.status
            }
        })
    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Email Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Update User',
            error
        })
    }
}

// DELETE /api/users/:userId
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            })
        }

        return res.status(200).json({
            message: 'User Deleted Successfully',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete User',
            error
        })
    }
}

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()
            .select('-password')
            .sort({ createdAt: -1 })

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Users',
            error
        })
    }
}

