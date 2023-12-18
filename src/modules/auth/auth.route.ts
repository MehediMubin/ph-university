import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
   "/login",
   validateRequest(AuthValidation.loginValidationSchema),
   AuthController.loginUser,
);

export const AuthRoutes = router;
