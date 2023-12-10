import { Types } from "mongoose";

export type TPrerequisite = {
   course: Types.ObjectId;
   isDeleted: boolean;
};

export type TCourse = {
   title: string;
   prefix: string;
   code: number;
   credit: number;
   isDeleted?: boolean;
   preRequisiteCourses?: TPrerequisite[];
};

export type TCourseFaculty = {
   course: Types.ObjectId;
   faculties: [Types.ObjectId];
};
