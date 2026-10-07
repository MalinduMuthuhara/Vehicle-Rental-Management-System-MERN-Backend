import { Schema, model, Document, Types } from 'mongoose'

interface IInvoice extends Document {
    invoiceNumber: string
    bookingId: Types.ObjectId
    userId: Types.ObjectId
    subtotal: number
    taxAmount: number
    discountAmount: number
    totalAmount: number
    issuedDate: Date
    status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED'
}

const invoiceSchema = new Schema<IInvoice>(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0
        },
        taxAmount: {
            type: Number,
            required: true,
            min: 0
        },
        discountAmount: {
            type: Number,
            required: true,
            min: 0
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        issuedDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['DRAFT', 'ISSUED', 'PAID', 'CANCELLED'],
            required: true,
            default: 'DRAFT'
        }
    },
    {
        timestamps: true
    }
)

const InvoiceModel = model<IInvoice>('Invoice', invoiceSchema)

export default InvoiceModel

