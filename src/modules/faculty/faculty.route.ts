import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { FacultyController } from "./faculty.controller";
import { facultyValidations } from "./faculty.validation";

const router = Router();

router.get("/", auth(), FacultyController.getAllFaculties);

router.get("/:id", FacultyController.getSingleFaculty);

router.patch(
   "/:id",
   validateRequest(facultyValidations.updateFaculty),
   FacultyController.updateSingleFaculty,
);

router.delete("/:id", FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
