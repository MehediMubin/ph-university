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

academicDepartmentSchema.pre("save", async function (next) {
   const isDepartmentExist = await AcademicDepartmentModel.findOne({
      name: this.name,
   });

   if (isDepartmentExist) {
      throw new Error("Department already exist");
   }
   next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
   const query = this.getQuery();
   const isDepartmentExist = await AcademicDepartmentModel.findOne(query);

   if (!isDepartmentExist) {
      throw new Error("Department does not exist");
   }
   next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
   "academic-department",
   academicDepartmentSchema,
);
