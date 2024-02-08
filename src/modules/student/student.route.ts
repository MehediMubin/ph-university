import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { StudentController } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = Router();

router.get(
   "/",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   StudentController.getAllStudents,
);

router.get(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
   StudentController.getSingleStudent,
);

router.patch(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(studentValidations.updateStudent),
   StudentController.updateSingleStudent,
);

router.delete(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   StudentController.deleteSingleStudent,
);

export const StudentRoutes = router;
