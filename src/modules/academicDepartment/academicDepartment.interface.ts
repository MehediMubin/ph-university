import { Types } from "mongoose";

export type TAcademicDepartment = {
   name: string;
   facultyId: Types.ObjectId;
};
