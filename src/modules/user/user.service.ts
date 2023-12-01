import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.id = "2030100001";
   user.password = payload.password || (config.default_password as string);
   user.role = "student";

   const admissionSemester = await AcademicSemesterModel.findById(
      payload.admissionSemester,
   );

   user.id = generateStudentId(admissionSemester);

   const newUser = await UserModel.create(user);

   if (Object.keys(newUser).length) {
      payload.user = newUser._id;
      payload.id = newUser.id;
      payload.password = newUser.password;
      const newStudent = await StudentModel.create(payload);
      return newStudent;
   }
};

export const UserServices = {
   createStudent,
};
