import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.password = payload.password || (config.default_password as string);
   user.role = "student";

   const admissionSemester = await AcademicSemesterModel.findById(
      payload.admissionSemester,
   );

   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      user.id = await generateStudentId(admissionSemester);

      // transaction 1
      const newUser = await UserModel.create([user], { session });

      // transaction use korar karone newUser array hoye jay
      if (!newUser.length) {
         throw new AppError(400, "User creation failed");
      }

      payload.user = newUser[0]._id;
      payload.id = newUser[0].id;

      // transaction 2
      const newStudent = await StudentModel.create([payload], { session });

      if (!newStudent.length) {
         throw new AppError(400, "Student creation failed");
      }

      await session.commitTransaction();
      session.endSession();

      return newStudent;
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
   }
};

export const UserServices = {
   createStudent,
};
