import { Schema, model } from "mongoose";
import { TCourse, TPrerequisite } from "./course.interface";

const preRequisiteSchema = new Schema<TPrerequisite>({
   course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
   },
   isDeleted: {
      type: Boolean,
      default: false,
   },
});

const courseSchema = new Schema<TCourse>(
   {
      title: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      prefix: {
         type: String,
         required: true,
      },
      code: {
         type: Number,
         required: true,
      },
      credit: {
         type: Number,
         required: true,
      },
      preRequisiteCourses: [preRequisiteSchema],
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

export const CourseModel = model<TCourse>("Course", courseSchema);
