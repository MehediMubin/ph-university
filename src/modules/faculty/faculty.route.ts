import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { FacultyController } from "./faculty.controller";
import { facultyValidations } from "./faculty.validation";

const router = Router();

router.get(
   "/",
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
   FacultyController.getAllFaculties,
);

router.get(
   "/:id",
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
   FacultyController.getSingleFaculty,
);

router.patch(
   "/:id",
   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
   validateRequest(facultyValidations.updateFaculty),
   FacultyController.updateSingleFaculty,
);

router.delete(
   "/:id",
   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
   FacultyController.deleteSingleFaculty,
);

export const FacultyRoutes = router;
