import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistraion = async (payload: TSemesterRegistration) => {
   // check if there is a semester registration which has status upcoming or ongoing
   const isSemesterRegistrationWithStatusExists =
      await SemesterRegistrationModel.findOne({
         $or: [
            { status: SemesterRegistrationStatus.UPCOMING },
            { status: SemesterRegistrationStatus.ONGOING },
         ],
      });

   if (isSemesterRegistrationWithStatusExists) {
      throw new AppError(
         400,
         "There is a semester registration which has status upcoming or ongoing",
      );
   }

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
      .limit(limit)
      .populate("academicSemester");
   return semesterRegistrations;
};

const getSingleSemesterRegistration = async (id: string) => {
   const semesterRegistration =
      await SemesterRegistrationModel.findById(id).populate("academicSemester");
   return semesterRegistration;
};

const updateSemesterRegistration = async (
   id: string,
   payload: Partial<TSemesterRegistration>,
) => {
   // check if semester registration already exists
   const isSemesterRegistrationExists =
      await SemesterRegistrationModel.findById(id);
   if (!isSemesterRegistrationExists) {
      throw new AppError(404, "Semester not found");
   }

   // if the requested semester registration is ended, then it can't be updated
   const currentSemesterStatus = isSemesterRegistrationExists?.status;
   if (currentSemesterStatus === SemesterRegistrationStatus.ENDED) {
      throw new AppError(
         400,
         "This semester is ended. So, it can't be updated",
      );
   }

   const requestedSemesterStatus = payload?.status;
   if (
      currentSemesterStatus === SemesterRegistrationStatus.UPCOMING &&
      requestedSemesterStatus === SemesterRegistrationStatus.ENDED
   ) {
      throw new AppError(400, "Upcoming semester can't be ended");
   }

   if (
      currentSemesterStatus === SemesterRegistrationStatus.ONGOING &&
      requestedSemesterStatus === SemesterRegistrationStatus.UPCOMING
   ) {
      throw new AppError(400, "Ongoing semester can't be changed to upcoming");
   }

   const result = await SemesterRegistrationModel.findByIdAndUpdate(
      id,
      payload,
      { new: true, runValidators: true },
   );
   return result;
};

export const SemesterRegistrationService = {
   createSemesterRegistraion,
   getAllSemesterRegistrations,
   getSingleSemesterRegistration,
   updateSemesterRegistration,
};
