import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const getAllStudents = catchAsync(async (req, res, next) => {
   const students = await StudentServices.getAllStudents();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Students fetched successfully",
      data: students,
   });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const student = await StudentServices.getSingleStudent(id);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student fetched successfully",
      data: student,
   });
});

const deleteSingleStudent = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const result = await StudentServices.deleteSingleStudent(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student deleted successfully",
      data: result,
   });
});

export const StudentController = {
   getAllStudents,
   getSingleStudent,
   deleteSingleStudent,
};
