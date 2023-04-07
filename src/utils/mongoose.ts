import mongoose from 'mongoose';

const { NEXT_PUBLIC_MONGODB_URL } = process.env;

if (!NEXT_PUBLIC_MONGODB_URL) {
  throw new Error('no mongoDb url');
}

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(NEXT_PUBLIC_MONGODB_URL);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export default connectDB;
