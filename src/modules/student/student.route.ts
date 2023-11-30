import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

export const StudentRoutes = router;
