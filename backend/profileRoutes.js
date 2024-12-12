// routes/profileRoutes.js
import express from 'express';
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
} from '../controllers/profileController.js';

const router = express.Router();

// GET all profiles
router.get('/', getAllProfiles);

// GET a single profile by ID
router.get('/:id', getProfileById);

// POST a new profile
router.post('/', createProfile);

// PUT to update a profile by ID
router.put('/:id', updateProfile);

// DELETE a profile by ID
router.delete('/:id', deleteProfile);

export default router;