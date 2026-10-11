import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vehicle_rental'

    try {
        await mongoose.connect(uri)
        console.log('MongoDB Connected : ', mongoose.connection.name)
    } catch (error) {
        console.error('MongoDB connection failed : ', error)
        process.exit(1)
    }
}

export default connectDB;