import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { createToken } from "./auth.utils";

const loginUser = async (id: string, password: string) => {
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

   // check if the password is correct or not
   const isPasswordMatched = await UserModel.isPasswordMatched(
      password,
      user.password,
   );
   if (!isPasswordMatched) {
      throw new AppError(403, "Password is incorrect");
   }

   const jwtPayload = {
      id: user.id,
      role: user.role,
   };

   // create jwt token and sent to the user
   const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
   );

   const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
   );

   return {
      accessToken,
      refreshToken,
      needsPasswordChange: user?.needsPasswordChange,
   };
};

const changePassword = async (
   userData: JwtPayload,
   passwords: Record<string, string>,
) => {
   const user = await UserModel.isUserExistsById(userData.id);
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

   // check if the password is correct or not
   const isPasswordMatched = await UserModel.isPasswordMatched(
      passwords.oldPassword,
      user.password,
   );
   if (!isPasswordMatched) {
      throw new AppError(403, "Password is incorrect");
   }

   const newHashedPassword = bcrypt.hashSync(
      passwords.newPassword,
      Number(config.bcrypt_salt),
   );

   await UserModel.findOneAndUpdate(
      {
         id: userData.id,
         role: userData.role,
      },
      {
         password: newHashedPassword,
         needsPasswordChange: false,
         passwordChangedAt: new Date(),
      },
   );

   return null;
};

const refreshToken = async (refreshToken: string) => {
   const decoded = jwt.verify(
      refreshToken,
      config.jwt_refresh_secret as string,
   ) as JwtPayload;

   const { id, iat } = decoded;

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

   const jwtPayload = {
      id: user.id,
      role: user.role,
   };

   // create jwt token and sent to the user
   const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
   );

   return {
      accessToken,
   };
};

export const AuthService = {
   loginUser,
   changePassword,
   refreshToken,
};
