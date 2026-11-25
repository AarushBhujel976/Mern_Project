import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters']
    },
    email: {
      type: String,
      required: [true, 'Your email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    subject: {
      type: String,
      default: 'Portfolio contact',
      trim: true,
      maxlength: [120, 'Subject cannot exceed 120 characters']
    },
    message: {
      type: String,
      required: [true, 'A message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
