import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
   const lastStudent = await UserModel.findOne({ role: "student" }).sort({
      createdAt: -1,
   });

   return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// ID -> year + semeseter code + 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
   const initialId = (await findLastStudentId()) || (0).toString();
   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `${payload.year.slice(0, 4)}${payload.code}${newId}`;
   return id;
};
