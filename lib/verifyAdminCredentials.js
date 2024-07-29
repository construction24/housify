import bcrypt from 'bcrypt';
import Admin from '@/models/admin.model';
import { connectDB } from '@/dbConfig';

export async function verifyAdminCredentials(email, password) {
  try {
    await connectDB(); 

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    return isPasswordValid;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw new Error('Error verifying credentials');
  }
}