
import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile
} from '../controller/profile.controller.js';
import {verifyUser} from '../middlewares/verifyUser.js'; 
import upload from '../middlewares/upload.js';      

const router = express.Router();

router.get('/', verifyUser, getProfile);
router.put('/', verifyUser, upload.single('profilePicture'), updateProfile);
router.delete('/', verifyUser, deleteProfile);

export default router;
