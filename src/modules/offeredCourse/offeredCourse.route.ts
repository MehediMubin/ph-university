import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { OfferedCourseController } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = Router();

router.post(
   "/create-offered-course",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(OfferedCourseValidations.create),
   OfferedCourseController.createOfferedCourse,
);

router.patch(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(OfferedCourseValidations.update),
   OfferedCourseController.updateOfferedCourse,
);

router.get(
   "/",
   auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.student,
      USER_ROLE.faculty,
   ),
   OfferedCourseController.getAllOfferedCourses,
);

router.get(
   "/:id",
   auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.student,
      USER_ROLE.faculty,
   ),
   OfferedCourseController.getSingleOfferedCourse,
);

router.delete(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   OfferedCourseController.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
