import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { AdminController } from "./admin.controller";
import { adminValidations } from "./admin.validation";

const router = Router();

router.get("/", auth(USER_ROLE.admin), AdminController.getAllAdmins);

router.get("/:id", auth(USER_ROLE.admin), AdminController.getSingleAdmin);

router.patch(
   "/:id",
   auth(USER_ROLE.admin),
   validateRequest(adminValidations.updateAdmin),
   AdminController.updateSingleAdmin,
);

router.delete("/:id", auth(USER_ROLE.admin), AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
