import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = Router();

router.post(
   "/create-course",
   validateRequest(CourseValidations.createCourse),
   CourseController.createCourse,
);

router.get("/", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch('/:id', validateRequest(CourseValidations.updateCourse), CourseController.updateCourse);

router.delete("/:id", CourseController.deleteSingleCourse);

export const CourseRoutes = router;
