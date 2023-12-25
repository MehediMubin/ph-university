import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { EnrolledCourseController } from "./enrolledController";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";

const router = Router();

router.post(
   "/create-enrolled-course",
   auth("student"),
   validateRequest(EnrolledCourseValidations.create),
   EnrolledCourseController.createEnrolledCourse,
);

router.patch(
   "/update-enrolled-course-marks",
   auth("faculty"),
   validateRequest(EnrolledCourseValidations.updateMarks),
   EnrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
