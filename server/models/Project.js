import mongoose from 'mongoose';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: { type: String, unique: true, index: true },
    summary: {
      type: String,
      required: [true, 'Project summary is required'],
      trim: true,
      maxlength: [300, 'Summary cannot exceed 300 characters']
    },
    description: {
      type: String,
      default: '',
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    techStack: { type: [String], default: [] },
    image: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    category: { type: String, default: 'Web App' },
    year: { type: Number, default: () => new Date().getFullYear() },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

projectSchema.pre('validate', function () {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title);
  }
});

export default mongoose.model('Project', projectSchema);
