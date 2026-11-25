import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent. Please try again in an hour.' }
});

router.route('/').post(contactLimiter, createMessage).get(protect, getMessages);
router.patch('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

export default router;
