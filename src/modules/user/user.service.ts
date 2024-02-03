/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TAdmin } from "../admin/admin.interface";
import { AdminModel } from "../admin/admin.model";
import { FacultyModel } from "../faculty/faculty.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import {
   generateAdminId,
   generateFacultyId,
   generateStudentId,
} from "./user.utils";

const createStudent = async (
   file: any,
   password: string,
   payload: TStudent,
) => {
   // create a user object
   const userData: Partial<TUser> = {};

   //if password is not given , use default password
   userData.password = password || (config.default_password as string);

   //set student role
   userData.role = "student";
   // set student email
   userData.email = payload.email;

   // find academic semester info
   const admissionSemester = await AcademicSemesterModel.findById(
      payload.admissionSemester,
   );

   if (!admissionSemester) {
      throw new AppError(400, "Admission semester not found");
   }

   // find department
   const academicDepartment = await AcademicDepartmentModel.findById(
      payload.academicDepartment,
   );

   if (!academicDepartment) {
      throw new AppError(400, "Aademic department not found");
   }
   payload.academicFaculty = academicDepartment.academicFaculty;

   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateStudentId(admissionSemester);

      if (file) {
         const imageName = `${userData.id}${payload?.name?.firstName}`;
         const path = file?.path;

         //send image to cloudinary
         const { secure_url } = await sendImageToCloudinary(imageName, path);
         payload.profileImage = secure_url as string;
      }

      // create a user (transaction-1)
      const newUser = await UserModel.create([userData], { session }); // array

      //create a student
      if (!newUser.length) {
         throw new AppError(400, "Failed to create user");
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id

      // create a student (transaction-2)
      const newStudent = await StudentModel.create([payload], { session });

      if (!newStudent.length) {
         throw new AppError(400, "Failed to create student");
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
   } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
   }
};

const createFaculty = async (
   file: any,
   password: string,
   payload: TFaculty,
) => {
   // create a user object
   const userData: Partial<TUser> = {};

   //if password is not given , use deafult password
   userData.password = password || (config.default_password as string);

   //set faculty role
   userData.role = "faculty";
   //set faculty email
   userData.email = payload.email;

   // find academic department info
   const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
   );

   if (!academicDepartment) {
      throw new AppError(400, "Academic department not found");
   }

   payload.academicFaculty = academicDepartment?.academicFaculty;

   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFacultyId();

      if (file) {
         const imageName = `${userData.id}${payload?.name?.firstName}`;
         const path = file?.path;
         //send image to cloudinary
         const { secure_url } = await sendImageToCloudinary(imageName, path);
         payload.profileImg = secure_url as string;
      }

      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array

      //create a faculty
      if (!newUser.length) {
         throw new AppError(400, "Failed to create user");
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id

      // create a faculty (transaction-2)

      const newFaculty = await FacultyModel.create([payload], { session });

      if (!newFaculty.length) {
         throw new AppError(400, "Failed to create faculty");
      }

      await session.commitTransaction();
      await session.endSession();

      return newFaculty;
   } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
   }
};

const createAdmin = async (file: any, password: string, payload: TAdmin) => {
   // create a user object
   const userData: Partial<TUser> = {};

   //if password is not given , use deafult password
   userData.password = password || (config.default_password as string);

   //set student role
   userData.role = "admin";
   //set admin email
   userData.email = payload.email;
   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();

      if (file) {
         const imageName = `${userData.id}${payload?.name?.firstName}`;
         const path = file?.path;
         //send image to cloudinary
         const { secure_url } = await sendImageToCloudinary(imageName, path);
         payload.profileImage = secure_url as string;
      }

      // create a user (transaction-1)
      const newUser = await UserModel.create([userData], { session });

      //create a admin
      if (!newUser.length) {
         throw new AppError(400, "Failed to create admin");
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id

      // create a admin (transaction-2)
      const newAdmin = await AdminModel.create([payload], { session });

      if (!newAdmin.length) {
         throw new AppError(400, "Failed to create admin");
      }

      await session.commitTransaction();
      await session.endSession();

      return newAdmin;
   } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
   }
};

const getMe = async (payload: JwtPayload) => {
   const { id, role } = payload;

   let result = null;
   if (role === "student") {
      result = await StudentModel.findOne({ id }).populate("user");
   } else if (role === "admin") {
      result = await AdminModel.findOne({ id }).populate("user");
   } else if (role === "faculty") {
      result = await FacultyModel.findOne({ id }).populate("user");
   }

   if (!result) {
      throw new AppError(404, "User not found");
   }

   return result;
};

const changeStatus = async (id: string, status: string) => {
   const result = await UserModel.findOneAndUpdate(
      { id },
      { status },
      { new: true },
   );
   return result;
};

export const UserServices = {
   createStudent,
   createFaculty,
   createAdmin,
   getMe,
   changeStatus,
};
