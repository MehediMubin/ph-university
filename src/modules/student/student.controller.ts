import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const getAllStudents = catchAsync(async (req, res) => {
   const students = await StudentServices.getAllStudents(req.query);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Students fetched successfully",
      data: students,
   });
});

const getSingleStudent = catchAsync(async (req, res) => {
   const { id } = req.params;
   const student = await StudentServices.getSingleStudent(id);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student fetched successfully",
      data: student,
   });
});

const updateSingleStudent = catchAsync(async (req, res) => {
   const student = await StudentServices.updateSingleStudent(
      req.params.id,
      req.body.student,
   );

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student updated successfully",
      data: student,
   });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
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
   updateSingleStudent,
   deleteSingleStudent,
};
