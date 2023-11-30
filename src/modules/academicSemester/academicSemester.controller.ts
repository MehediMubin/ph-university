import { ObjectId } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.createAcademicSemester(
      req.body,
   );
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Academic Semester created successfully",
      data: result,
   });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.getAllAcademicSemester();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All Academic Semester fetched successfully",
      data: result,
   });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.getSingleAcademicSemester(
      req.params.id,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single Academic Semester fetched successfully",
      data: result,
   });
});

const updateSinglAcademicSemester = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.updateSinglAcademicSemester(
      req.params.id,
      req.body,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single Academic Semester updated successfully",
      data: result,
   });
});

export const academicSemesterController = {
   createAcademicSemester,
   getAllAcademicSemester,
   getSingleAcademicSemester,
   updateSinglAcademicSemester,
};
