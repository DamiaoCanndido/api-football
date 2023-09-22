import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL ?? '');
    console.log('DB connection success.');
  } catch (error) {
    console.log('DB connection failed.');
  }
}
