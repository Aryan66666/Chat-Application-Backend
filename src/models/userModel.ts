import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  profilePhoto: { type: String, default: null },
  lastSeen: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  isVerified: {type: Boolean, default:false},
}, {
  timestamps: true,       
  versionKey: true
});

const User = model('User', userSchema); 
export default User;
