import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  isAdmin: { type: Boolean, default: false },
  otp: {
    value: { type: String },
    expiresAt: { type: Date },
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
