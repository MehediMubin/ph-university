/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
   id: string;
   password: string;
   needsPasswordChange: boolean;
   role: "admin" | "faculty" | "student";
   status: "in-progress" | "blocked";
   isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
   isUserExistsById(id: string): Promise<TUser>;
   isPasswordMatched(
      password: string,
      hashedPassword: string,
   ): Promise<boolean>;
}
