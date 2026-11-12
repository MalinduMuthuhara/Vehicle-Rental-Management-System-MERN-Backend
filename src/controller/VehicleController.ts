
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import VehicleModel from '../model/VehicleModel'

// POST /api/vehicles
export const createVehicle = async (req: Request, res: Response) => {
    try {
        const {
            registrationNumber,
            brand,
            model,
            year,
            color,
            transmission,
            fuelType,
            seatingCapacity,
            dailyRate,
            status,
            categoryId,
            branchId
        } = req.body

        if (
            !registrationNumber?.trim() ||
            !brand?.trim() ||
            !model?.trim() ||
            year === undefined || year === null ||
            !color?.trim() ||
            !transmission?.trim() ||
            !fuelType?.trim() ||
            seatingCapacity === undefined || seatingCapacity === null ||
            dailyRate === undefined || dailyRate === null ||
            !status?.trim() ||
            !categoryId ||
            !branchId
        ) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        const vehicleYear = Number(year)
        const seats = Number(seatingCapacity)
        const rate = Number(dailyRate)

        if (
            !Number.isInteger(vehicleYear) ||
            vehicleYear <= 0 ||
            !Number.isInteger(seats) ||
            seats <= 0 ||
            !Number.isFinite(rate) ||
            rate < 0
        ) {
            return res.status(400).json({
                message: 'Invalid Vehicle Details'
            })
        }

        if (
            !mongoose.isValidObjectId(categoryId) ||
            !mongoose.isValidObjectId(branchId)
        ) {
            return res.status(400).json({
                message: 'Invalid Category ID or Branch ID'
            })
        }

        const vehicle = await VehicleModel.create({
            registrationNumber: registrationNumber.trim(),
            brand: brand.trim(),
            model: model.trim(),
            year: vehicleYear,
            color: color.trim(),
            transmission: transmission.trim(),
            fuelType: fuelType.trim(),
            seatingCapacity: seats,
            dailyRate: rate,
            status: status.trim(),
            categoryId,
            branchId
        })

        return res.status(201).json({
            message: 'Vehicle Created Successfully',
            body: vehicle
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Registration Number Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Create Vehicle'
        })
    }
}

// PUT /api/vehicles/:vehicleId
export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params

        if (!mongoose.isValidObjectId(vehicleId)) {
            return res.status(400).json({
                message: 'Invalid Vehicle ID'
            })
        }

        const {
            registrationNumber,
            brand,
            model,
            year,
            color,
            transmission,
            fuelType,
            seatingCapacity,
            dailyRate,
            status,
            categoryId,
            branchId
        } = req.body

        const updateData: Record<string, unknown> = {}

        const stringFields = {
            registrationNumber,
            brand,
            model,
            color,
            transmission,
            fuelType,
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

        if (year !== undefined) {
            const vehicleYear = Number(year)

            if (!Number.isInteger(vehicleYear) || vehicleYear <= 0) {
                return res.status(400).json({
                    message: 'Invalid Vehicle Year'
                })
            }

            updateData.year = vehicleYear
        }

        if (seatingCapacity !== undefined) {
            const seats = Number(seatingCapacity)

            if (!Number.isInteger(seats) || seats <= 0) {
                return res.status(400).json({
                    message: 'Invalid Seating Capacity'
                })
            }

            updateData.seatingCapacity = seats
        }

        if (dailyRate !== undefined) {
            const rate = Number(dailyRate)

            if (!Number.isFinite(rate) || rate < 0) {
                return res.status(400).json({
                    message: 'Invalid Daily Rate'
                })
            }

            updateData.dailyRate = rate
        }

        if (categoryId !== undefined) {
            if (!mongoose.isValidObjectId(categoryId)) {
                return res.status(400).json({
                    message: 'Invalid Category ID'
                })
            }

            updateData.categoryId = categoryId
        }

        if (branchId !== undefined) {
            if (!mongoose.isValidObjectId(branchId)) {
                return res.status(400).json({
                    message: 'Invalid Branch ID'
                })
            }

            updateData.branchId = branchId
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: 'No Valid Fields Provided'
            })
        }

        const vehicle = await VehicleModel.findByIdAndUpdate(
            vehicleId,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle Not Found'
            })
        }

        return res.status(200).json({
            message: 'Vehicle Updated Successfully',
            body: vehicle
        })

    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return res.status(409).json({
                message: 'Registration Number Already Exists'
            })
        }

        return res.status(500).json({
            message: 'Failed To Update Vehicle'
        })
    }
}

// DELETE /api/vehicles/:vehicleId
export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params

        if (!mongoose.isValidObjectId(vehicleId)) {
            return res.status(400).json({
                message: 'Invalid Vehicle ID'
            })
        }

        const vehicle = await VehicleModel.findByIdAndDelete(vehicleId)

        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle Not Found'
            })
        }

        return res.status(200).json({
            message: 'Vehicle Deleted Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete Vehicle'
        })
    }
}

// GET /api/vehicles
export const getVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await VehicleModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(vehicles)

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Vehicles'
        })
    }
}
