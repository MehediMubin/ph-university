import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

router.get("/", AcademicDepartmentController.getAllAcademicDepartments);

router.get("/:id", AcademicDepartmentController.getSingleAcademicDepartment);

router.post(
   "/create-academic-department",
   // validateRequest(academicDepartmentValidations.create),
   AcademicDepartmentController.createAcademicDepartment,
);

router.patch(
   "/:id",
   validateRequest(academicDepartmentValidations.update),
   AcademicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
