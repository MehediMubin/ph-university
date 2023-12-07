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

   if (lastStudentId) {
      const lastStudentSemesterCode = lastStudentId.slice(4, 6);
      const lastStudentYear = lastStudentId.slice(0, 4);

      const currentSemesterCode = payload.code;
      const currentYear = payload.year.slice(0, 4);

      if (
         lastStudentSemesterCode === currentSemesterCode &&
         lastStudentYear === currentYear
      ) {
         initialId = lastStudentId.slice(6, 10);
      }
   }

   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `${payload.year.slice(0, 4)}${payload.code}${newId}`;
   return id;
};

const findLastFacultyId = async () => {
   const lastFaculty = await UserModel.findOne({ role: "faculty" }).sort({
      createdAt: -1,
   });

   return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
   let initialId = (0).toString();

   const lastFacultyId = await findLastFacultyId();

   if (lastFacultyId) {
      initialId = lastFacultyId.slice(2, 6);
   }

   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `F-${newId}`;
   return id;
};

const findLastAdminId = async () => {
   const lastAdmin = await UserModel.findOne({ role: "admin" }).sort({
      createdAt: -1,
   });

   return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
   let initialId = (0).toString();

   const lastAdminId = await findLastAdminId();

   if (lastAdminId) {
      initialId = lastAdminId.slice(2, 6);
   }

   const newId = (Number(initialId) + 1).toString().padStart(4, "0");

   const id = `A-${newId}`;
   return id;
};
