/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
   id: string;
   email: string;
   password: string;
   needsPasswordChange: boolean;
   passwordChangedAt?: Date;
   role: "superAdmin" | "admin" | "faculty" | "student";
   status: "in-progress" | "blocked";
   isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface TUserModel extends Model<TUser> {
   isUserExistsById(id: string): Promise<TUser>;
   isPasswordMatched(
      password: string,
      hashedPassword: string,
   ): Promise<boolean>;
   isJWTValid(passwordChangedAt: Date, tokenIssuedAt: number): boolean;
}
