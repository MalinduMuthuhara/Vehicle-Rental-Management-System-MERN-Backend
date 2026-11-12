import { Request, Response } from 'express'
import mongoose from 'mongoose'
import VehicleCategoryModel from '../model/VehicleCategoryModel'

// POST /api/vehiclecategories
export const createVehicleCategory = async (req: Request, res: Response) => {
    try {
        const {
            categoryName,
            description,
            baseDailyRate,
            status
        } = req.body

        if (
            !categoryName?.trim() ||
            !description?.trim() ||
            baseDailyRate === undefined ||
            baseDailyRate === null ||
            !status?.trim()
        ) {
            return res.status(400).json({
                message: 'Please Fill All The Fields'
            })
        }

        const rate = Number(baseDailyRate)

        if (!Number.isFinite(rate) || rate < 0) {
            return res.status(400).json({
                message: 'Invalid Base Daily Rate'
            })
        }

        const vehicleCategory = await VehicleCategoryModel.create({
            categoryName: categoryName.trim(),
            description: description.trim(),
            baseDailyRate: rate,
            status: status.trim()
        })

        return res.status(201).json({
            message: 'Vehicle Category Created Successfully',
            body: vehicleCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Create Vehicle Category'
        })
    }
}

// PUT /api/vehiclecategories/:vehicleCategoryId
export const updateVehicleCategory = async (req: Request, res: Response) => {
    try {
        const { vehicleCategoryId } = req.params

        if (!mongoose.isValidObjectId(vehicleCategoryId)) {
            return res.status(400).json({
                message: 'Invalid Vehicle Category ID'
            })
        }

        const {
            categoryName,
            description,
            baseDailyRate,
            status
        } = req.body

        const updateData: Record<string, unknown> = {}

        if (categoryName !== undefined) {
            if (typeof categoryName !== 'string' || !categoryName.trim()) {
                return res.status(400).json({
                    message: 'Invalid Category Name'
                })
            }
            updateData.categoryName = categoryName.trim()
        }

        if (description !== undefined) {
            if (typeof description !== 'string' || !description.trim()) {
                return res.status(400).json({
                    message: 'Invalid Description'
                })
            }
            updateData.description = description.trim()
        }

        if (baseDailyRate !== undefined) {
            const rate = Number(baseDailyRate)

            if (!Number.isFinite(rate) || rate < 0) {
                return res.status(400).json({
                    message: 'Invalid Base Daily Rate'
                })
            }

            updateData.baseDailyRate = rate
        }

        if (status !== undefined) {
            if (typeof status !== 'string' || !status.trim()) {
                return res.status(400).json({
                    message: 'Invalid Status'
                })
            }
            updateData.status = status.trim()
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: 'No Valid Fields Provided'
            })
        }

        const vehicleCategory = await VehicleCategoryModel.findByIdAndUpdate(
            vehicleCategoryId,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!vehicleCategory) {
            return res.status(404).json({
                message: 'Vehicle Category Not Found'
            })
        }

        return res.status(200).json({
            message: 'Vehicle Category Updated Successfully',
            body: vehicleCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Update Vehicle Category'
        })
    }
}

// DELETE /api/vehiclecategories/:vehicleCategoryId
export const deleteVehicleCategory = async (req: Request, res: Response) => {
    try {
        const { vehicleCategoryId } = req.params

        if (!mongoose.isValidObjectId(vehicleCategoryId)) {
            return res.status(400).json({
                message: 'Invalid Vehicle Category ID'
            })
        }

        const vehicleCategory = await VehicleCategoryModel.findByIdAndDelete(
            vehicleCategoryId
        )

        if (!vehicleCategory) {
            return res.status(404).json({
                message: 'Vehicle Category Not Found'
            })
        }

        return res.status(200).json({
            message: 'Vehicle Category Deleted Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete Vehicle Category'
        })
    }
}

// GET /api/vehiclecategories
export const getVehicleCategories = async (req: Request, res: Response) => {
    try {
        const vehicleCategories = await VehicleCategoryModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(vehicleCategories)

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Vehicle Categories'
        })
    }
}
