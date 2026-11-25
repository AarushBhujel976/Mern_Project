import Profile from '../models/Profile.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: 1 });
    res.json(profile || null);
  } catch (error) {
    next(error);
  }
};

export const upsertProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
