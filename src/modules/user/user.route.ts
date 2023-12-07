import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { adminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
   "/create-student",
   validateRequest(studentValidations.createStudent),
   UserController.createStudent,
);

router.post(
   "/create-faculty",
   validateRequest(facultyValidations.createFaculty),
   UserController.createFaculty,
);

router.post(
   "/create-admin",
   validateRequest(adminValidations.createAdmin),
   UserController.createAdmin,
);

export const UserRoutes = router;
