import { Router } from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.get("/", AcademicDepartmentController.getAllAcademicDepartments);

router.get("/:id", AcademicDepartmentController.getSingleAcademicDepartment);

router.post(
   "/create-academic-department",
   AcademicDepartmentController.createAcademicDepartment,
);

router.patch("/:id", AcademicDepartmentController.updateAcademicDepartment);

export const academicDepartmentRoutes = router;
