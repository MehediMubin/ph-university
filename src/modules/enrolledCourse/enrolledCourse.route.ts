import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { EnrolledCourseController } from "./enrolledController";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";

const router = Router();

router.post(
   "/create-enrolled-course",
   auth(USER_ROLE.student),
   validateRequest(EnrolledCourseValidations.create),
   EnrolledCourseController.createEnrolledCourse,
);

router.patch(
   "/update-enrolled-course-marks",
   auth(USER_ROLE.faculty, USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(EnrolledCourseValidations.updateMarks),
   EnrolledCourseController.updateEnrolledCourseMarks,
);

export const enrolledCourseRoutes = router;
