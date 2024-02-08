import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.post(
   "/create-semester-registration",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(SemesterRegistrationValidations.create),
   SemesterRegistrationController.createSemesterRegistration,
);

router.get(
   "/",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   SemesterRegistrationController.getAllSemesterRegistrations,
);

router.get(
   "/:id",
   auth(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(SemesterRegistrationValidations.update),
   SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
   "/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   SemesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
