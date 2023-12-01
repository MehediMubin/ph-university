import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
   const result = await AcademicFacultyServices.createAcademicFaculty(req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Academic faculty created successfully",
      data: result,
   });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
   const result = await AcademicFacultyServices.getAllAcademicFaculty();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty fetched successfully",
      data: result,
   });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
   const result = await AcademicFacultyServices.getSingleAcademicFaculty(
      req.params.id,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty fetched successfully",
      data: result,
   });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
   const result = await AcademicFacultyServices.updateAcademicFaculty(
      req.params.id,
      req.body,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty updated successfully",
      data: result,
   });
});

export const AcademicFacultyController = {
   createAcademicFaculty,
   getAllAcademicFaculty,
   getSingleAcademicFaculty,
   updateAcademicFaculty,
};
