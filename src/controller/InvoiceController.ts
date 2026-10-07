import { Request, Response } from 'express'
import InvoiceModel from '../model/InvoiceModel'

// POST /api/invoices
export const createInvoice = async (req: Request, res: Response) => {
    try {
        const {invoiceNumber,bookingId,userId,subtotal,taxAmount,discountAmount,totalAmount,issuedDate,status} = req.body

        if (!invoiceNumber ||!bookingId ||!userId ||subtotal == null ||subtotal < 0 ||taxAmount == null ||taxAmount < 0 ||discountAmount == null ||discountAmount < 0 || totalAmount == null || totalAmount < 0 || !issuedDate || !status) {
            return res.status(400).json({
                message: 'Please Fill All Fields'
            })
        }

        const invoice = await InvoiceModel.create({invoiceNumber,bookingId,userId,subtotal,taxAmount,discountAmount,totalAmount,issuedDate,status})

        return res.status(201).json({
            message: 'Invoice Created Successfully',
            body: invoice
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Create Invoice',
            error
        })
    }
}

// PUT /api/invoices/:invoiceId
export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const {
            invoiceNumber,
            bookingId,
            userId,
            subtotal,
            taxAmount,
            discountAmount,
            totalAmount,
            issuedDate,
            status
        } = req.body

        const invoice = await InvoiceModel.findByIdAndUpdate(
            req.params.invoiceId,
            {
                invoiceNumber,
                bookingId,
                userId,
                subtotal,
                taxAmount,
                discountAmount,
                totalAmount,
                issuedDate,
                status
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!invoice) {
            return res.status(404).json({
                message: 'Invoice Not Found'
            })
        }

        return res.status(200).json({
            message: 'Invoice Updated Successfully',
            body: invoice
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Update Invoice',
            error
        })
    }
}

// DELETE /api/invoices/:invoiceId
export const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await InvoiceModel.findByIdAndDelete(
            req.params.invoiceId
        )

        if (!invoice) {
            return res.status(404).json({
                message: 'Invoice Not Found'
            })
        }

        return res.status(200).json({
            message: 'Invoice Deleted Successfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Delete Invoice',
            error
        })
    }
}

// GET /api/invoices
export const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await InvoiceModel.find().sort({
            createdAt: -1
        })

        return res.status(200).json(invoices)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Fetch Invoice Data',
            error
        })
    }
}

