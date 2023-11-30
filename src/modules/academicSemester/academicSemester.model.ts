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
         type: Date,
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

export const AcademicSemesterModel = model<TAcademicSemester>(
   "academicSemester",
   academicSemesterSchema,
);
