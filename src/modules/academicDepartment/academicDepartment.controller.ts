import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
   const result = await AcademicDepartmentServices.createAcademicDepartment(
      req.body,
   );
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Academic department created successfully",
      data: result,
   });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
   const result = await AcademicDepartmentServices.getAllAcademicDepartments();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic department fetched successfully",
      data: result,
   });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
   const result = await AcademicDepartmentServices.getSingleAcademicDepartment(
      req.params.id,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic department fetched successfully",
      data: result,
   });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
   const result = await AcademicDepartmentServices.updateAcademicDepartment(
      req.params.id,
      req.body,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic department updated successfully",
      data: result,
   });
});

export const AcademicDepartmentController = {
   createAcademicDepartment,
   getAllAcademicDepartments,
   getSingleAcademicDepartment,
   updateAcademicDepartment,
};
