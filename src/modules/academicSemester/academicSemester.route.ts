import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterController } from "./academicSemester.controller";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post(
   "/create-academic-semester",
   validateRequest(academicSemesterValidations.createAcademicSemester),
   academicSemesterController.createAcademicSemester,
);

router.get(
   "/",
   auth("admin"),
   academicSemesterController.getAllAcademicSemester,
);

router.get("/:id", academicSemesterController.getSingleAcademicSemester);

router.patch(
   "/:id",
   validateRequest(academicSemesterValidations.updateAcademicSemester),
   academicSemesterController.updateSinglAcademicSemester,
);

export const AcademicSemesterRoutes = router;
