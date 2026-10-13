import express from 'express'
import cors from 'cors'

import userRoutes from './routes/UserRoutes'
import branchRoutes from './routes/BranchRoutes'
import vehicleCategoryRoutes from './routes/VehicleCategoryRoutes'
import vehicleRoutes from './routes/VehicleRoutes'
import vehicleDocumentRoutes from './routes/VehicleDocumentRoutes'
import vehicleMaintenanceRoutes from './routes/VehicleMaintenanceRoutes'
import bookingRoutes from './routes/BookingRoutes'
import rentalRoutes from './routes/RentalRoutes'
import paymentRoutes from './routes/PaymentRoutes'
import invoiceRoutes from './routes/InvoiceRoutes'
import reviewRoutes from './routes/ReviewRoutes'
import damageReportRoutes from "./routes/DamageReportRoutes";

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
    res.json({
        message: 'Vehicle Rental API is Running'
    })
})

app.use('/api/users', userRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/vehicle-categories', vehicleCategoryRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/vehicle-documents', vehicleDocumentRoutes)
app.use('/api/vehicle-maintenances', vehicleMaintenanceRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/rentals', rentalRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/damage-reports' , damageReportRoutes)

export default app
