import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import { adminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
   "/create-student",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   upload.single("file"),
   (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
   },
   validateRequest(studentValidations.createStudent),
   UserController.createStudent,
);

router.post(
   "/create-faculty",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   upload.single("file"),
   (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
   },
   validateRequest(facultyValidations.createFaculty),
   UserController.createFaculty,
);

router.post(
   "/create-admin",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   upload.single("file"),
   (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
   },
   validateRequest(adminValidations.createAdmin),
   UserController.createAdmin,
);

router.get(
   "/me",
   auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.faculty,
      USER_ROLE.student,
   ),
   UserController.getMe,
);

router.post(
   "/change-status/:id",
   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
   validateRequest(UserValidations.changeStatusValidationSchema),
   UserController.changeStatus,
);

export const UserRoutes = router;
