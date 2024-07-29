import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from '../models/admin.model.js';
import { DB_NAME } from '../constants/index.js';

// MongoDB URI
const MONGODB_URI = `${process.env.MONGODB_URI}/${DB_NAME}`;
console.log(MONGODB_URI)

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


async function addAdmin() {
  try {
    await connectDB();

    const email = 'architjain669@gmail.com'; 
    const password = '123456789'; 

    const passwordHash = await bcrypt.hash(password, 10);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const admin = new Admin({
      email,
      passwordHash,
    });

    await admin.save();
    console.log('Admin added successfully');
  } catch (error) {
    console.error('Error adding admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

addAdmin();
