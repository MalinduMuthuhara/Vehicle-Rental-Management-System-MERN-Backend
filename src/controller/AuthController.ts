import { Request, Response } from 'express'
import UserModel from '../model/UserModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password Are Required'
            })
        }

        // Password field is normally excluded by the schema
        const user = await UserModel.findOne({
            email: email.toLowerCase().trim()
        }).select('+password')/*Password eka DatabaseQuery eken labenne na
                                    log weddi witharak password eka labaganimata +password use karay*/

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Email Or Password'
            })
        }

        if (user.status !== 'ACTIVE') {
            return res.status(403).json({
                message: 'Your Account Is Not Active'
            })
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid Email or Password'
            })
        }

        const jwtSecret = process.env.JWT_SECRET

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is Not Configured')
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role: user.role
            },
            jwtSecret,
            { expiresIn: '1d' }
        )

        return res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                status: user.status
            }
        })

    } catch (error) {
        console.error('Login Error:', error)

        return res.status(500).json({
            message: 'Login Failed'
        })
    }
}