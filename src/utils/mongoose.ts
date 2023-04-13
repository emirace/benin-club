import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('no mongoDb url');
}
console.log(MONGODB_URI);
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log('connected to DB');
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export default connectDB;
