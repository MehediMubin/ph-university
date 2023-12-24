import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
   const { password, student } = req.body;

   const result = await UserServices.createStudent(req.file, password, student);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

const createFaculty = catchAsync(async (req, res) => {
   const { password, faculty } = req.body;
   // console.log(faculty);

   const result = await UserServices.createFaculty(password, faculty);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Faculty created successfully",
      data: result,
   });
});

const createAdmin = catchAsync(async (req, res) => {
   const { password, admin } = req.body;
   // console.log(admin);

   const result = await UserServices.createAdmin(password, admin);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin created successfully",
      data: result,
   });
});

const getMe = catchAsync(async (req, res) => {
   const result = await UserServices.getMe(req.user);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User details",
      data: result,
   });
});

const changeStatus = catchAsync(async (req, res) => {
   const { id } = req.params;
   const { status } = req.body;

   const result = await UserServices.changeStatus(id, status);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated",
      data: result,
   });
});

export const UserController = {
   createStudent,
   createFaculty,
   createAdmin,
   getMe,
   changeStatus,
};
