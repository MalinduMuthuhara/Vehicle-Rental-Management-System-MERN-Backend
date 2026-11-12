
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import ReviewModel from '../model/ReviewModel'
import BookingModel from '../model/BookingModel'
import { AuthenticatedRequest } from '../middleware/AuthMiddleware'

// POST /api/reviews
export const createReview = async (req: Request, res: Response) => {
    try {
        const authenticatedReq = req as AuthenticatedRequest
        const user = authenticatedReq.user

        if (!user) {
            return res.status(401).json({
                message: 'Authentication Required'
            })
        }

        const { vehicleId, bookingId, rating, comment } = req.body

        if (
            !vehicleId ||
            !bookingId ||
            rating === undefined ||
            typeof comment !== 'string' ||
            !comment.trim()
        ) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        if (
            !mongoose.isValidObjectId(vehicleId) ||
            !mongoose.isValidObjectId(bookingId)
        ) {
            return res.status(400).json({
                message: 'Invalid Vehicle ID or Booking ID'
            })
        }

        if (
            !Number.isInteger(Number(rating)) ||
            Number(rating) < 1 ||
            Number(rating) > 5
        ) {
            return res.status(400).json({
                message: 'Rating Must Be Between 1 And 5'
            })
        }

        // Check whether booking exists
        const booking = await BookingModel.findById(bookingId)

        if (!booking) {
            return res.status(404).json({
                message: 'Booking Not Found'
            })
        }

        // CUSTOMER can review only their own booking
        if (
            user.role === 'CUSTOMER' &&
            booking.userId.toString() !== user.userId
        ) {
            return res.status(403).json({
                message: 'You Cannot Review Another Customer Booking'
            })
        }

        // Vehicle must belong to the selected booking
        if (booking.vehicleId.toString() !== vehicleId) {
            return res.status(400).json({
                message: 'Vehicle Does Not Match The Booking'
            })
        }

        // Only completed bookings can be reviewed
        if (booking.status !== 'COMPLETED') {
            return res.status(400).json({
                message: 'Only Completed Bookings Can Be Reviewed'
            })
        }

        // One review per booking
        const existingReview = await ReviewModel.findOne({
            bookingId
        })

        if (existingReview) {
            return res.status(409).json({
                message: 'A Review Already Exists For This Booking'
            })
        }

        const review = await ReviewModel.create({
            userId: booking.userId,
            vehicleId: booking.vehicleId,
            bookingId: booking._id,
            rating: Number(rating),
            comment: comment.trim(),
            reviewDate: new Date(),
            status: 'PENDING'
        })

        return res.status(201).json({
            message: 'Review Created Successfully',
            body: review
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Create Review'
        })
    }
}


// PUT /api/reviews/:reviewId
export const updateReview = async (req: Request, res: Response) => {
    try {
        const authenticatedReq = req as AuthenticatedRequest
        const user = authenticatedReq.user

        if (!user) {
            return res.status(401).json({
                message: 'Authentication Required'
            })
        }

        const { reviewId } = req.params

        if (!reviewId || !mongoose.isValidObjectId(reviewId)) {
            return res.status(400).json({
                message: 'Invalid Review ID'
            })
        }

        const { rating, comment, status } = req.body

        const updateData: Record<string, unknown> = {}

        if (rating !== undefined) {
            if (
                !Number.isInteger(Number(rating)) ||
                Number(rating) < 1 ||
                Number(rating) > 5
            ) {
                return res.status(400).json({
                    message: 'Rating Must Be Between 1 And 5'
                })
            }

            updateData.rating = Number(rating)
        }

        if (comment !== undefined) {
            if (
                typeof comment !== 'string' ||
                !comment.trim()
            ) {
                return res.status(400).json({
                    message: 'Invalid Review Comment'
                })
            }

            updateData.comment = comment.trim()
        }

        // Only ADMIN can change review status
        if (status !== undefined) {
            if (user.role !== 'ADMIN') {
                return res.status(403).json({
                    message: 'Only Admin Can Change Review Status'
                })
            }

            if (
                !['PENDING', 'APPROVED', 'REJECTED'].includes(status)
            ) {
                return res.status(400).json({
                    message: 'Invalid Review Status'
                })
            }

            updateData.status = status
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: 'No Valid Fields Provided'
            })
        }

        // ADMIN can update any review.
        // CUSTOMER can update only their own review.
        const filter: any = {
            _id: reviewId
        }

        if (user.role !== 'ADMIN') {
            filter.userId = user.userId
        }

        const review = await ReviewModel.findOneAndUpdate(
            filter,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!review) {
            return res.status(404).json({
                message: 'Review Not Found'
            })
        }

        return res.status(200).json({
            message: 'Review Updated Successfully',
            body: review
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Update Review'
        })
    }
}


// DELETE /api/reviews/:reviewId
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const authenticatedReq = req as AuthenticatedRequest
        const user = authenticatedReq.user

        if (!user) {
            return res.status(401).json({
                message: 'Authentication Required'
            })
        }

        const { reviewId } = req.params

        if (!reviewId || !mongoose.isValidObjectId(reviewId)) {
            return res.status(400).json({
                message: 'Invalid Review ID'
            })
        }

        // ADMIN can delete any review.
        // CUSTOMER can delete only their own review.
        const filter: any = {
            _id: reviewId
        }

        if (user.role !== 'ADMIN') {
            filter.userId = user.userId
        }

        const review = await ReviewModel.findOneAndDelete(filter)

        if (!review) {
            return res.status(404).json({
                message: 'Review Not Found'
            })
        }

        return res.status(200).json({
            message: 'Review Deleted Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete Review'
        })
    }
}


// GET /api/reviews
export const getReviews = async (req: Request, res: Response) => {
    try {
        const authenticatedReq = req as AuthenticatedRequest
        const user = authenticatedReq.user

        if (!user) {
            return res.status(401).json({
                message: 'Authentication Required'
            })
        }

        // CUSTOMER can view only their own reviews.
        // ADMIN and EMPLOYEE can view all reviews.
        const filter: any = user.role === 'CUSTOMER'
            ? { userId: user.userId }
            : {}

        const reviews = await ReviewModel.find(filter).sort({
            createdAt: -1
        })

        return res.status(200).json(reviews)

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Reviews'
        })
    }
}
