import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { FacultyModel } from "./faculty.model";

const getAllFaculties = async () => {
   const faculties = await FacultyModel.find();
   return faculties;
};

const getSingleFaculty = async (id: string) => {
   const faculty = await FacultyModel.findOne({ id });
   return faculty;
};

const updateSingleFaculty = async (
   id: string,
   payload: Record<string, unknown>,
) => {
   const updatedFaculty = await FacultyModel.findOneAndUpdate(
      { id: id },
      payload,
      {
         new: true,
      },
   );
   return updatedFaculty;
};

const deleteSingleFaculty = async (id: string) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const deleteFaculty = await FacultyModel.findOneAndUpdate(
         { id: id },
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteFaculty) {
         throw new Error("Faculty deletion failed");
      }

      const deleteUser = await UserModel.findOneAndUpdate(
         { id: id },
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
