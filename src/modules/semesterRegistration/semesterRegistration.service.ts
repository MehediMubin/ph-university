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

const getAllSemesterRegistrations = async (query: Record<string, unknown>) => {
   const page = Number(query.page) || 1;
   const limit = Number(query.limit) || 0;
   const skip = (page - 1) * limit;

   const queryObject = { ...query };
   const excludeFields = ["search", "sort", "limit", "page", "fields"];
   excludeFields.forEach((field) => delete queryObject[field]);

   const semesterRegistrations = await SemesterRegistrationModel.find()
      .find(queryObject)
      .skip(skip)
      .limit(limit);
   return semesterRegistrations;
};

export const SemesterRegistrationService = {
   createSemesterRegistraion,
   getAllSemesterRegistrations,
};
