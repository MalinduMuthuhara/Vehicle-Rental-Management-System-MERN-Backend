import { Request, Response } from 'express'
import mongoose from 'mongoose'
import BranchModel from '../model/BranchModel'

// Email validation
const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// POST /api/branches
export const createBranch = async (req: Request, res: Response) => {
    try {
        const {
            branchName,
            address,
            city,
            contactNumber,
            email,
            status
        } = req.body

        if (
            !branchName?.trim() ||
            !address?.trim() ||
            !city?.trim() ||
            !contactNumber?.trim() ||
            !email?.trim() ||
            !status?.trim()
        ) {
            return res.status(400).json({
                message: 'Please Fill All The Fields'
            })
        }

        if (!isValidEmail(email.trim())) {
            return res.status(400).json({
                message: 'Invalid Email Address'
            })
        }

        const branch = await BranchModel.create({
            branchName: branchName.trim(),
            address: address.trim(),
            city: city.trim(),
            contactNumber: contactNumber.trim(),
            email: email.trim().toLowerCase(),
            status: status.trim()
        })

        return res.status(201).json({
            message: 'Branch Created Successfully',
            body: branch
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Branch Details Already Exist'
            })
        }

        return res.status(500).json({
            message: 'Failed To Create Branch'
        })
    }
}

// PUT /api/branches/:branchId
export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { branchId } = req.params

        if (!mongoose.isValidObjectId(branchId)) {
            return res.status(400).json({
                message: 'Invalid Branch ID'
            })
        }

        const {
            branchName,
            address,
            city,
            contactNumber,
            email,
            status
        } = req.body

        const updateData: Record<string, string> = {}

        const stringFields = {
            branchName,
            address,
            city,
            contactNumber,
            email,
            status
        }

        for (const [field, value] of Object.entries(stringFields)) {
            if (value !== undefined) {
                if (typeof value !== 'string' || !value.trim()) {
                    return res.status(400).json({
                        message: `Invalid ${field}`
                    })
                }

                updateData[field] = value.trim()
            }
        }

        if (updateData.email) {
            if (!isValidEmail(updateData.email)) {
                return res.status(400).json({
                    message: 'Invalid Email Address'
                })
            }

            updateData.email = updateData.email.toLowerCase()
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: 'No Valid Fields Provided'
            })
        }

        const branch = await BranchModel.findByIdAndUpdate(
            branchId,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!branch) {
            return res.status(404).json({
                message: 'Branch Not Found'
            })
        }

        return res.status(200).json({
            message: 'Branch Updated Successfully',
            body: branch
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Branch Details Already Exist'
            })
        }

        return res.status(500).json({
            message: 'Failed To Update Branch'
        })
    }
}

// DELETE /api/branches/:branchId
export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { branchId } = req.params

        if (!mongoose.isValidObjectId(branchId)) {
            return res.status(400).json({
                message: 'Invalid Branch ID'
            })
        }

        const branch = await BranchModel.findByIdAndDelete(branchId)

        if (!branch) {
            return res.status(404).json({
                message: 'Branch Not Found'
            })
        }

        return res.status(200).json({
            message: 'Branch Deleted Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete Branch'
        })
    }
}

// GET /api/branches
export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await BranchModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(branches)

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Branches'
        })
    }
}
