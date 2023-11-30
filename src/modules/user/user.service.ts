import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudent = async (password: string, student) => {
   const user: Partial<TUser> = {};

   user.id = "2030100001";
   user.password = student.password || (config.default_password as string);
   user.role = "student";

   const newUser = await UserModel.create(user);

   if (Object.keys(newUser).length) {
      student.user = newUser._id;
      student.id = newUser.id;
      student.password = newUser.password;
      const newStudent = await StudentModel.create(student);
      return newStudent;
   }
};

export const UserServices = {
   createStudent,
};
