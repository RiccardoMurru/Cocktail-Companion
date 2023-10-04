import mongoose, { ConnectOptions } from 'mongoose';

async function connectToTestDB(): Promise<void> {
  try {
    await mongoose.connect(`${process.env.MONGODB_TEST_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    console.log('Connected to test DB');
  } catch (err) {
    console.error('Test database connection error:', err);
  }
}

export { connectToTestDB };