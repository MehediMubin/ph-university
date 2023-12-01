import { Router } from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.post(
   "/create-academic-faculty",
   AcademicFacultyController.createAcademicFaculty,
);

router.get("/", AcademicFacultyController.getAllAcademicFaculty);

router.get("/:id", AcademicFacultyController.getSingleAcademicFaculty);

router.patch("/:id", AcademicFacultyController.updateAcademicFaculty);

export const academicFacultyRoutes = router;
