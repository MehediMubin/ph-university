import { Schema, model } from "mongoose";
import { TFaculty, TName } from "./faculty.interface";

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

const facultySchema = new Schema<TFaculty>(
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
      academicFaculty: {
         type: Schema.Types.ObjectId,
         ref: "academicFaculty",
         required: true,
      },
      academicDepartment: {
         type: Schema.Types.ObjectId,
         ref: "academicDepartment",
         required: true,
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

export const FacultyModel = model<TFaculty>("faculty", facultySchema);
