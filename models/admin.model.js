import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const Admin = mongoose.models.admins || mongoose.model('admins', adminSchema);

export default Admin;