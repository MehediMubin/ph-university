import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
   const lastStudent = await UserModel.findOne({ role: "student" }).sort({
      createdAt: -1,
   });

   return lastStudent?.id ? lastStudent.id : undefined;
};

// ID -> year + semeseter code + 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
   let initialId = (0).toString();

   const lastStudentId = await findLastStudentId();

   const lastStudentSemesterCode = lastStudentId?.slice(4, 6);
   const lastStudentYear = lastStudentId?.slice(0, 4);

   const currentSemesterCode = payload.code;
   const currentYear = payload.year.slice(0, 4);

   if (
      lastStudentId &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
   ) {
      initialId = lastStudentId.slice(6, 10);
   }

   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `${payload.year.slice(0, 4)}${payload.code}${newId}`;
   return id;
};
