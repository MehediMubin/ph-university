import { ObjectId } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemester = async (payload: TAcademicSemester) => {
   // semester name and code must be mapped
   const nameAndCodeMapper = {
      Autumn: "01",
      Summer: "02",
      Fall: "03",
   };

   if (nameAndCodeMapper[payload.name] !== payload.code) {
      throw new Error("Invalid Semester Code");
   }

   const result = await AcademicSemesterModel.create(payload);
   return result;
};

const getAllAcademicSemester = async () => {
   const result = await AcademicSemesterModel.find();
   return result;
};

const getSingleAcademicSemester = async (id: string) => {
   const result = await AcademicSemesterModel.findById(id);
   return result;
};

const updateSinglAcademicSemester = async (id: string, data) => {
   const result = await AcademicSemesterModel.findByIdAndUpdate(id, data, {
      new: true,
   });
   return result;
};

export const AcademicSemesterServices = {
   createAcademicSemester,
   getAllAcademicSemester,
   getSingleAcademicSemester,
   updateSinglAcademicSemester,
};
