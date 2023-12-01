import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

// ID -> year + semeseter code + 4 digit number
export const generateStudentId = (payload: TAcademicSemester): string => {
   const initialId = (0).toString().padStart(4, "0");
   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `${payload.year.slice(0, 4)}${payload.code}${newId}`;
   return id;
};
