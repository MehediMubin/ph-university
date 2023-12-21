import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { AdminModel } from "../admin/admin.model";
import { FacultyModel } from "../faculty/faculty.model";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import {
   generateAdminId,
   generateFacultyId,
   generateStudentId,
} from "./user.utils";

const createStudent = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.password = password || (config.default_password as string);
   user.role = "student";
   user.email = payload.email;

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
   // console.log(payload);
   const user: Partial<TUser> = {};

   user.password = password || (config.default_password as string);
   user.role = "faculty";
   user.email = payload.email;

   const session = await mongoose.startSession();
   try {
      session.startTransaction();
      user.id = await generateFacultyId();

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

const createAdmin = async (password: string, payload) => {
   const user: Partial<TUser> = {};

   user.password = password || (config.default_password as string);
   user.role = "admin";
   user.email = payload.email;

   const session = await mongoose.startSession();
   try {
      session.startTransaction();
      user.id = await generateAdminId();

      const newUser = await UserModel.create([user], { session });

      if (!newUser.length) {
         throw new AppError(400, "User creation failed");
      }

      payload.user = newUser[0]._id;
      payload.id = newUser[0].id;

      const newAdmin = await AdminModel.create([payload], { session });

      if (!newAdmin.length) {
         throw new AppError(400, "Admin creation failed");
      }

      await session.commitTransaction();
      session.endSession();

      return newAdmin;
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Admin creation failed");
   }
};

export const UserServices = {
   createStudent,
   createFaculty,
   createAdmin,
};
