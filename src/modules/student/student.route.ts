import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { StudentController } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = Router();

router.get("/", StudentController.getAllStudents);

router.get(
   "/:id",
   auth("admin", "faculty"),
   StudentController.getSingleStudent,
);

router.patch(
   "/:id",
   validateRequest(studentValidations.updateStudent),
   StudentController.updateSingleStudent,
);

router.delete("/:id", StudentController.deleteSingleStudent);

export const StudentRoutes = router;
