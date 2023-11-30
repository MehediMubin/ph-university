import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";

const Month: TMonth[] = [
   "january",
   "february",
   "march",
   "april",
   "may",
   "june",
   "july",
   "august",
   "september",
   "october",
   "november",
   "december",
];

const academicSemesterSchema = new Schema<TAcademicSemester>(
   {
      name: {
         type: String,
         enum: ["Autumn", "Summer", "Fall"],
         required: true,
      },
      year: {
         type: String,
         required: true,
      },
      code: {
         type: String,
         enum: ["01", "02", "03"],
         required: true,
      },
      startMonth: {
         type: String,
         enum: Month,
         required: true,
      },
      endMonth: {
         type: String,
         enum: Month,
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

academicSemesterSchema.pre("save", async function (next) {
   const isSemesterExists = await AcademicSemesterModel.findOne({
      name: this.name,
      year: this.year,
   });

   if (isSemesterExists) {
      throw new Error("Semester already exists");
   }

   next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
   "academicSemester",
   academicSemesterSchema,
);
