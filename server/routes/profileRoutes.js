import { Router } from 'express';
import { getProfile, upsertProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.route('/').get(getProfile).put(protect, upsertProfile);

export default router;
