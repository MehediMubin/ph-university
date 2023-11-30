import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

router.delete("/:id", StudentController.deleteSingleStudent);

export const StudentRoutes = router;
