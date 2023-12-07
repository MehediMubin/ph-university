import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { TFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";

const getAllFaculties = async () => {
   const faculties = await FacultyModel.find();
   return faculties;
};

const getSingleFaculty = async (id: string) => {
   const faculty = await FacultyModel.findById(id);
   return faculty;
};

const updateSingleFaculty = async (id: string, payload: Partial<TFaculty>) => {
   const { name, ...remainingFacultyData } = payload;

   const updatedPayload: Record<string, unknown> = { ...remainingFacultyData };

   if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
         updatedPayload[`name.${key}`] = value;
      }
   }

   const result = await FacultyModel.findByIdAndUpdate(id, updatedPayload, {
      new: true,
   });
   return result;
};

const deleteSingleFaculty = async (id: string) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const deleteFaculty = await FacultyModel.findByIdAndUpdate(
         id,
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteFaculty) {
         throw new Error("Faculty deletion failed");
      }

      const deleteUser = await UserModel.findByIdAndUpdate(
         id,
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteUser) {
         throw new Error("User deletion failed");
      }

      await session.commitTransaction();
      session.endSession();
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Faculty deletion failed");
   }
};

export const FacultyServices = {
   getAllFaculties,
   getSingleFaculty,
   updateSingleFaculty,
   deleteSingleFaculty,
};
