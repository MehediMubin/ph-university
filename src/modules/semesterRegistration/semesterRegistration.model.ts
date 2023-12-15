import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
   {
      academicSemester: {
         type: Schema.Types.ObjectId,
         unique: true,
         ref: "academicSemester",
         required: true,
      },
      status: {
         type: String,
         enum: ["upcoming", "ongoing", "ended"],
         default: "upcoming",
      },
      startDate: {
         type: Date,
         required: true,
      },
      endDate: {
         type: Date,
         required: true,
      },
      minCredit: {
         type: Number,
         default: 3,
      },
      maxCredit: {
         type: Number,
         default: 15,
      },
   },
   { timestamps: true },
);

export const SemesterRegistrationModel = model<TSemesterRegistration>(
   "SemesterRegistration",
   semesterRegistrationSchema,
);
