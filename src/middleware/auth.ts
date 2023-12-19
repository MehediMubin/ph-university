import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
   return catchAsync(async (req, res, next) => {
      // get token from the header
      const token = req.headers.authorization;
      if (!token) {
         throw new AppError(401, "Unauthorized");
      }

      // verify token
      jwt.verify(token, config.jwt_secret_key as string, (err, decoded) => {
         if (err) {
            throw new AppError(401, "Unauthorized");
         }

         const role = (decoded as JwtPayload).role;
         if (!requiredRoles.includes(role)) {
            throw new AppError(403, "You are not allowed to access this route");
         }

         req.user = decoded as JwtPayload;
      });
      next();
   });
};

export default auth;
