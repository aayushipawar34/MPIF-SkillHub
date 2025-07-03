import express from 'express';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../controller/course.controller.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();
router.get('/', getAllCourses);
router.post('/', verifyUser, addCourse);
router.put('/:id', verifyUser, updateCourse);
router.delete('/:id', verifyUser, deleteCourse);

export default router;
