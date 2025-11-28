import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

export const connectDB = async (): Promise<void> => {
    console.log('MongoDB URI:', MONGO_URI);
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};