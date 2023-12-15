import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistraion = async (payload: TSemesterRegistration) => {
   // check if academic semester already exists
   const academicSemester = payload?.academicSemester;
   if (academicSemester) {
      const isAcademicSemesterExists =
         await AcademicSemesterModel.findById(academicSemester);
      if (!isAcademicSemesterExists) {
         throw new AppError(404, "Academic semester not found");
      }
   }

   // check if semester registration already exists
   const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne(
      { academicSemester },
   );
   if (isSemesterRegistrationExists) {
      throw new AppError(400, "Semester registration already exists");
   }

   const semesterRegistration = await SemesterRegistrationModel.create(payload);
   return semesterRegistration;
};

export const SemesterRegistrationService = {
   createSemesterRegistraion,
};
