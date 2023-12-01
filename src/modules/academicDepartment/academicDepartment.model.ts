import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      facultyId: {
         type: Schema.Types.ObjectId,
         ref: "academicFaculty",
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

export const AcademicDepartmentModel = model<TAcademicDepartment>(
   "academic-department",
   academicDepartmentSchema,
);
