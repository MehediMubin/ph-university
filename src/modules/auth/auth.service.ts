import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";

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
   const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key as string, {
      expiresIn: "10d",
   });

   return {
      accessToken,
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
      },
   );

   return null;
};

export const AuthService = {
   loginUser,
   changePassword,
};
