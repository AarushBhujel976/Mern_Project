import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.route('/').get(getProjects).post(protect, createProject);
router.route('/:id').get(getProject).put(protect, updateProject).delete(protect, deleteProject);

export default router;
