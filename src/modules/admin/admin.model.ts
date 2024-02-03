import { Schema, model } from "mongoose";
import { TAdmin, TName } from "./admin.interface";

const nameSchema = new Schema<TName>({
   firstName: {
      type: String,
      required: true,
   },
   middleName: {
      type: String,
   },
   lastName: {
      type: String,
      required: true,
   },
});

const adminSchema = new Schema<TAdmin>(
   {
      id: {
         type: String,
         required: true,
         unique: true,
      },
      designation: {
         type: String,
         required: true,
      },
      name: {
         type: nameSchema,
         required: true,
      },
      gender: {
         type: String,
         enum: ["male", "female", "other"],
         required: true,
      },
      dateOfBirth: {
         type: Date,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      contactNumber: {
         type: String,
         required: true,
      },
      emergencyContactNumber: {
         type: String,
         required: true,
      },
      presentAddress: {
         type: String,
         required: true,
      },
      permanentAddress: {
         type: String,
         required: true,
      },
      profileImage: {
         type: String,
         default: "",
      },
      managementDepartment: {
         type: String,
         required: true,
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

export const AdminModel = model<TAdmin>("admin", adminSchema);
