import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    console.log('Connected to DB');
  } catch (err) {
    console.log('database connection error');
  }
}
connect();

export default mongoose;
