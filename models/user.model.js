import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: AddressSchema,
    default: null,
  },
  otpCode: {
    type: String,
    default: null,
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

// Index for otpExpiresAt to allow for efficient querying of expired OTPs
UserSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
