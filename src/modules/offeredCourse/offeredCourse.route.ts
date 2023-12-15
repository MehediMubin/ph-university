import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseController } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = Router();

router.post(
   "/create-offered-course",
   validateRequest(OfferedCourseValidations.create),
   OfferedCourseController.createOfferedCourse,
);

export const OfferedCourseRoutes = router;
