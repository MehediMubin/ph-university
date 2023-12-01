import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { academicFacultyValidations } from "./academicFaculty.validation";

const router = Router();

router.post(
   "/create-academic-faculty",
   validateRequest(academicFacultyValidations.create),
   AcademicFacultyController.createAcademicFaculty,
);

router.get("/", AcademicFacultyController.getAllAcademicFaculty);

router.get("/:id", AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
   "/:id",
   validateRequest(academicFacultyValidations.update),
   AcademicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
