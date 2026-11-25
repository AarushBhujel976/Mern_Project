import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Message from '../models/Message.js';
import { profileSeed, projectSeed } from '../data/seedData.js';

dotenv.config();

const run = async () => {
  await connectDB();

  try {
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Message.deleteMany({})
    ]);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';

    await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: adminEmail,
      password: adminPassword
    });

    await Profile.create(profileSeed);
    await Project.create(projectSeed);

    console.log('Seed complete.');
    console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
