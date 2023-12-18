import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";

const auth = () => {
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

         req.user = decoded as JwtPayload;
      });
      next();
   });
};

export default auth;
