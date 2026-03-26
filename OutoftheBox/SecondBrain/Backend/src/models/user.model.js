import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true       // bcrypt hashed
  },
  avatar: {
    type: String,
    default: null        // URL from cloudinary later
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
