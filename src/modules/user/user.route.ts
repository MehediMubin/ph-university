import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { studentValidations } from "../student/student.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
   "/create-student",
   validateRequest(studentValidations.createStudent),
   UserController.createStudent,
);

export const UserRoutes = router;
