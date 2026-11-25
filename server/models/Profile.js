import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({ label: String, url: String }, { _id: false });

const skillGroupSchema = new mongoose.Schema(
  { category: String, items: [String] },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    headline: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socials: [socialSchema],
    skills: [skillGroupSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
