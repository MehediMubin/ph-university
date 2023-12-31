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

router.patch(
   "/:id",
   validateRequest(OfferedCourseValidations.update),
   OfferedCourseController.updateOfferedCourse,
);

router.get("/", OfferedCourseController.getAllOfferedCourses);

router.get("/:id", OfferedCourseController.getSingleOfferedCourse);

router.delete("/:id", OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
