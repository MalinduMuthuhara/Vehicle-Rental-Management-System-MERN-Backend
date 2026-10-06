import { Request, Response } from 'express'
import UserModel from '../model/UserModel'

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email , password , contactNumber , address , role, status  } = req.body

        if (!userName || !email || !password || !contactNumber || !address || !role || !status) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        const user = await UserModel.create({ userName , email , password , contactNumber , address , role , status })

        return res.status(201).json({
            message: 'User Saved Successfully',
            body: user
        })
    } catch (error) {
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

        const user = await UserModel.findByIdAndUpdate(
            req.params.userId,
            { userName, email , password , contactNumber , address , role, status },
            { new: true, runValidators: true }
        )

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            })
        }

        return res.status(200).json({
            message: 'User Updated Successfully',
            body: user
        })
    } catch (error) {
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
        const users = await UserModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Users',
            error
        })
    }
}

