import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { FacultyModel } from "../faculty/faculty.model";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.password = password || (config.default_password as string);
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
      throw Error("Student creation failed");
   }
};

const createFaculty = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.password = password || (config.default_password as string);
   user.role = "faculty";

   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const newUser = await UserModel.create([user], { session });

      if (!newUser.length) {
         throw new AppError(400, "User creation failed");
      }

      payload.user = newUser[0]._id;
      payload.id = newUser[0].id;

      const newFaculty = await FacultyModel.create([payload], { session });

      if (!newFaculty.length) {
         throw new AppError(400, "Faculty creation failed");
      }

      await session.commitTransaction();
      session.endSession();

      return newFaculty;
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Faculty creation failed");
   }
};

export const UserServices = {
   createStudent,
   createFaculty,
};
