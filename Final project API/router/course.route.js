import express from 'express';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../controller/course.controller.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();
router.get('/courses', getAllCourses);
router.post('/courses', verifyUser, addCourse); 
router.put('/courses/:id', verifyUser, updateCourse); 
router.delete('/courses/:id', verifyUser, deleteCourse); 

export default router;
