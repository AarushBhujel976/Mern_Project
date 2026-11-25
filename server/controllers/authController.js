import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select(
      '+password'
    );

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ token: generateToken(user._id), user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const existingUsers = await User.countDocuments();

    if (existingUsers > 0) {
      return res.status(403).json({
        message: 'An admin account already exists. Please log in instead.'
      });
    }

    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    res.status(201).json({ token: generateToken(user._id), user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json(req.user.toSafeJSON());
};
