import { Router } from "express";
import { CourseController } from "./course.controller";

const router = Router();

router.post('/create-course', CourseController.createCourse);

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getSingleCourse);

router.delete('/:id', CourseController.deleteSingleCourse);

export const CourseRoutes = router;