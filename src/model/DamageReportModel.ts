import { Schema, model, Document, Types } from 'mongoose'

interface IDamageReport extends Document {
    rentalId: Types.ObjectId
    vehicleId: Types.ObjectId
    reportedBy: Types.ObjectId
    damageType: string
    description: string
    damageDate: Date
    estimatedCost: number
    repairCost?: number
    photoUrls: string[]
    status: 'REPORTED' | 'ASSESSED' | 'REPAIRED' | 'CLOSED'
}

const damageReportSchema = new Schema<IDamageReport>(
    {
        rentalId: { type: Schema.Types.ObjectId, ref: 'Rental', required: true },
        vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
        reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        damageType: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        damageDate: { type: Date, required: true },
        estimatedCost: { type: Number, required: true, min: 0 },
        repairCost: { type: Number, min: 0 },
        photoUrls: { type: [String], default: [] },
        status: {
            type: String,
            enum: ['REPORTED', 'ASSESSED', 'REPAIRED', 'CLOSED'],
            required: true,
            default: 'REPORTED'
        }
    },
    { timestamps: true }
)

const DamageReportModel = model<IDamageReport>('DamageReport', damageReportSchema)

export default DamageReportModel