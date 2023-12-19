import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
   return catchAsync(async (req, res, next) => {
      // get token from the header
      const token = req.headers.authorization;
      if (!token) {
         throw new AppError(401, "Unauthorized");
      }

      const decoded = jwt.verify(
         token,
         config.jwt_access_secret as string,
      ) as JwtPayload;

      const { id, role, iat } = decoded;

      const user = await UserModel.isUserExistsById(id);
      if (!user) {
         throw new AppError(404, "User not found");
      }

      // check if the user is deleted or not
      if (user.isDeleted) {
         throw new AppError(403, "User is deleted");
      }

      // check if the user is blocked or not
      if (user.status === "blocked") {
         throw new AppError(403, "User is blocked");
      }

      const { passwordChangedAt } = user;
      // check if the user changed the password after the token was issued
      if (
         passwordChangedAt &&
         UserModel.isJWTValid(passwordChangedAt, iat as number)
      ) {
         throw new AppError(401, "Unauthorized");
      }

      if (!requiredRoles.includes(role)) {
         throw new AppError(403, "You are not allowed to access this route");
      }

      req.user = decoded;
      next();
   });
};

export default auth;
