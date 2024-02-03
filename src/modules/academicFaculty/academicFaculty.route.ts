import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { academicFacultyValidations } from "./academicFaculty.validation";

const router = Router();

router.post(
   "/create-academic-faculty",
   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
