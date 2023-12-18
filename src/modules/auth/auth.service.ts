import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";

const loginUser = async (id: string, password: string) => {
   const isUserExists = await UserModel.findOne({ id });
   if (!isUserExists) {
      throw new AppError(404, "User not found");
   }

   // check if the user is deleted or not
   if (isUserExists.isDeleted) {
      throw new AppError(403, "User is deleted");
   }

   // check if the user is blocked or not
   if (isUserExists.status === "blocked") {
      throw new AppError(403, "User is blocked");
   }

   // check if the password is correct or not
   const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExists.password,
   );
   if (!isPasswordMatched) {
      throw new AppError(403, "Password is incorrect");
   }
   console.log(isPasswordMatched);
};

export const AuthService = {
   loginUser,
};
