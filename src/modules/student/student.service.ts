import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { StudentModel } from "./student.model";

const getAllStudents = async () => {
   const students = await StudentModel.find()
      .populate("admissionSemester")
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      });
   return students;
};

const getSingleStudent = async (id: string) => {
   const student = await StudentModel.findOne({ id: id })
      .populate("admissionSemester")
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      });
   return student;
};

const deleteSingleStudent = async (id: string) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const deleteStudent = await StudentModel.findOneAndUpdate(
         { id: id },
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteStudent) {
         throw new AppError(400, "Student not found");
      }

      const deleteUser = await UserModel.findOneAndUpdate(
         { id: id },
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteUser) {
         throw new AppError(400, "User not found");
      }

      await session.commitTransaction();
      session.endSession();

      return deleteStudent;
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
   }
};

export const StudentServices = {
   getAllStudents,
   getSingleStudent,
   deleteSingleStudent,
};
