import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.post(
   "/create-semester-registration",
   validateRequest(SemesterRegistrationValidations.create),
   SemesterRegistrationController.createSemesterRegistration,
);

router.get("/", SemesterRegistrationController.getAllSemesterRegistrations);

router.get(
   "/:id",
   SemesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
