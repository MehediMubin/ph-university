import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { academicSemesterController } from "./academicSemester.controller";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post(
   "/create-academic-semester",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(academicSemesterValidations.createAcademicSemester),
   academicSemesterController.createAcademicSemester,
);

router.get(
   "/",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   academicSemesterController.getAllAcademicSemester,
);

router.get(
   "/:id",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   academicSemesterController.getSingleAcademicSemester,
);

router.patch(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(academicSemesterValidations.updateAcademicSemester),
   academicSemesterController.updateSinglAcademicSemester,
);

export const AcademicSemesterRoutes = router;
