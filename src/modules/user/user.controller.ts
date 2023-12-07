import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
   const { password, student } = req.body;

   const result = await UserServices.createStudent(password, student);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

const createFaculty = catchAsync(async (req, res) => {
   const { password, faculty } = req.body;

   const result = await UserServices.createFaculty(password, faculty);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Faculty created successfully",
      data: result,
   });
});

export const UserController = {
   createStudent,
   createFaculty,
};
