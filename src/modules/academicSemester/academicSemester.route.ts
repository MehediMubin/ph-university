import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterController } from "./academicSemester.controller";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post(
   "/create-academic-semester",
   validateRequest(academicSemesterValidations.createAcademicSemester),
   academicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
