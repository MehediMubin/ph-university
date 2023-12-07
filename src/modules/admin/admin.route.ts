import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { adminValidations } from "./admin.validation";

const router = Router();

router.get("/", AdminController.getAllAdmins);

router.get("/:id", AdminController.getSingleAdmin);

router.patch(
   "/:id",
   validateRequest(adminValidations.updateAdmin),
   AdminController.updateSingleAdmin,
);

router.delete("/:id", AdminController.deleteSingleAdmin);

export const FacultyRoutes = router;
