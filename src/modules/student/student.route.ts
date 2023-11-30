import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.get("/", StudentController.getAllStudents);

export const StudentRoutes = router;
