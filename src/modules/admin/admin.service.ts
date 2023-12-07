import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

const getAllAdmins = async () => {
   const admins = await AdminModel.find();
   return admins;
};

const getSingleAdmin = async (id: string) => {
   const admin = await AdminModel.findById(id);
   return admin;
};

const updateSingleAdmin = async (id: string, payload: Partial<TAdmin>) => {
   const { name, ...remainingAdminData } = payload;

   const updatedPayload: Record<string, unknown> = { ...remainingAdminData };

   if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
         updatedPayload[`name.${key}`] = value;
      }
   }

   const result = await AdminModel.findByIdAndUpdate(id, updatedPayload, {
      new: true,
   });
   return result;
};

const deleteSingleAdmin = async (id: string) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const deleteAdmin = await AdminModel.findByIdAndUpdate(
         id,
         { isDeleted: true },
         { new: true, session },
      );

      if (!deleteAdmin) {
         throw new Error("Admin deletion failed");
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
      throw new Error("Admin deletion failed");
   }
};

export const AdminServices = {
   getAllAdmins,
   getSingleAdmin,
   updateSingleAdmin,
   deleteSingleAdmin,
};
