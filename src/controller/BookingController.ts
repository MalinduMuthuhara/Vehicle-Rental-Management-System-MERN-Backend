import { Request, Response } from 'express'
import BookingModel from '../model/BookingModel'

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string
        role: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
    }
}

// CREATE BOOKING
export const createBooking = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest
        const { vehicleId, pickupBranchId, returnBranchId, pickupDate, returnDate, totalAmount, status, notes } = req.body

        if (!vehicleId || !pickupBranchId || !returnBranchId ||
            !pickupDate || !returnDate || totalAmount == null || totalAmount <= 0) {
            return res.status(400).json({ message: 'Please Fill All Required Fields' })
        }

        const userId = authReq.user!.role === 'CUSTOMER'
            ? authReq.user!.userId
            : req.body.userId

        if (!userId) {
            return res.status(400).json({ message: 'User ID Is Required' })
        }

        const booking = await BookingModel.create({
            userId,
            vehicleId,
            pickupBranchId,
            returnBranchId,
            pickupDate,
            returnDate,
            totalAmount,
            status: authReq.user!.role === 'CUSTOMER' ? 'PENDING' : (status || 'PENDING'),
            notes
        })

        return res.status(201).json({
            message: 'Booking Created Successfully',
            body: booking
        })

    } catch (error) {
        return res.status(500).json({ message: 'Failed To Create Booking', error })
    }
}

// UPDATE BOOKING
export const updateBooking = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest
        const booking = await BookingModel.findById(req.params.bookingId)

        if (!booking) {
            return res.status(404).json({ message: 'Booking Not Found' })
        }

        const isCustomer = authReq.user!.role === 'CUSTOMER'

        if (isCustomer && booking.userId.toString() !== authReq.user!.userId) {
            return res.status(403).json({ message: 'You Cannot Update Another Customer Booking' })
        }

        if (isCustomer) {
            const { pickupDate, returnDate, notes } = req.body

            if (pickupDate !== undefined) booking.pickupDate = pickupDate
            if (returnDate !== undefined) booking.returnDate = returnDate
            if (notes !== undefined) booking.notes = notes
        } else {
            const {
                userId, vehicleId, pickupBranchId, returnBranchId,
                pickupDate, returnDate, totalAmount, status, notes
            } = req.body

            if (userId !== undefined) booking.userId = userId
            if (vehicleId !== undefined) booking.vehicleId = vehicleId
            if (pickupBranchId !== undefined) booking.pickupBranchId = pickupBranchId
            if (returnBranchId !== undefined) booking.returnBranchId = returnBranchId
            if (pickupDate !== undefined) booking.pickupDate = pickupDate
            if (returnDate !== undefined) booking.returnDate = returnDate
            if (totalAmount !== undefined) booking.totalAmount = totalAmount
            if (status !== undefined) booking.status = status
            if (notes !== undefined) booking.notes = notes
        }

        await booking.save()

        return res.status(200).json({
            message: 'Booking Updated Successfully',
            body: booking
        })

    } catch (error) {
        return res.status(500).json({ message: 'Failed To Update Booking', error })
    }
}

// DELETE BOOKING
export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest
        const booking = await BookingModel.findById(req.params.bookingId)

        if (!booking) {
            return res.status(404).json({ message: 'Booking Not Found' })
        }

        if (
            authReq.user!.role === 'CUSTOMER' &&
            booking.userId.toString() !== authReq.user!.userId
        ) {
            return res.status(403).json({ message: 'You Cannot Delete Another Customer Booking' })
        }

        await booking.deleteOne()

        return res.status(200).json({ message: 'Booking Deleted Successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Failed To Delete Booking', error })
    }
}

// GET BOOKINGS
export const getBookings = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest

        const filter = authReq.user!.role === 'CUSTOMER'
            ? { userId: authReq.user!.userId }
            : {}

        const bookings = await BookingModel.find(filter).sort({ createdAt: -1 })

        return res.status(200).json(bookings)

    } catch (error) {
        return res.status(500).json({ message: 'Failed To Fetch Booking Data', error })
    }
}
