import { Request, Response } from 'express'
import PaymentModel from '../model/PaymentModel'
import VehicleMaintenanceModel from '../model/VehicleMaintenanceModel'
import DamageReportModel from '../model/DamageReportModel'

// GET /api/profits
export const getProfit = async (req: Request, res: Response) => {
    try {
        const [payments, maintenances, damageReports] = await Promise.all([
            PaymentModel.find({ status: 'COMPLETED' }),

            VehicleMaintenanceModel.find({ status: 'COMPLETED' }),

            DamageReportModel.find({
                status: 'REPAIRED',
                repairCost: { $exists: true, $ne: null }
            })
        ])

        const totalRevenue = payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )

        const maintenanceExpenses = maintenances.reduce(
            (total, maintenance) => total + maintenance.cost,
            0
        )

        const damageExpenses = damageReports.reduce(
            (total, report) => total + (report.repairCost || 0),
            0
        )

        const totalExpenses = maintenanceExpenses + damageExpenses

        const netProfit = totalRevenue - totalExpenses

        return res.status(200).json({
            message: 'Profit Data Retrieved Successfully',
            totalRevenue,
            maintenanceExpenses,
            damageExpenses,
            totalExpenses,
            netProfit
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Failed To Calculate Profit',
            error
        })
    }
}
