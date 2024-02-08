import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { CourseController } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = Router();

router.post(
   "/create-course",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(CourseValidations.createCourse),
   CourseController.createCourse,
);

router.get(
   "/",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   CourseController.getAllCourses,
);

router.get(
   "/:id",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   CourseController.getSingleCourse,
);

router.get(
   "/:id/faculties",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   CourseController.getFacultyWithCourse,
);

router.put(
   "/:courseId/assign-faculties",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(CourseValidations.assignFaculties),
   CourseController.assignFaculties,
);

router.delete(
   "/:courseId/remove-faculties",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(CourseValidations.removeFaculties),
   CourseController.removeFaculties,
);

router.patch(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(CourseValidations.updateCourse),
   CourseController.updateCourse,
);

router.delete(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   CourseController.deleteSingleCourse,
);

export const CourseRoutes = router;
