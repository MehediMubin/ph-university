import { Router } from "express";
import { SemesterRegistrationController } from "./semesterRegistration.controller";

const router = Router();

router.post(
   "/create-semester-registration",
   SemesterRegistrationController.createSemesterRegistration,
);

router.get("/", SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
