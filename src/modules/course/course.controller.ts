import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
   const result = await CourseServices.createCourse(req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created successfully",
      data: result,
   });
});

const getAllCourses = catchAsync(async (req, res) => {
   const result = await CourseServices.getAllCourses(req.query);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All courses fetched successfully",
      data: result,
   });
});

const getSingleCourse = catchAsync(async (req, res) => {
   const { id } = req.params;
   const result = await CourseServices.getSingleCourse(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course fetched successfully",
      data: result,
   });
});

const getFacultyWithCourse = catchAsync(async (req, res) => {
   const result = await CourseServices.getFacultyWithCourse(req.params.id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty with course fetched successfully",
      data: result,
   });
});

const updateCourse = catchAsync(async (req, res) => {
   const { id } = req.params;
   const result = await CourseServices.updateCourse(id, req.body);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course updated successfully",
      data: result,
   });
});

const assignFaculties = catchAsync(async (req, res) => {
   const { courseId } = req.params;
   const result = await CourseServices.assignFaculties(courseId, req.body);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculties assigned successfully",
      data: result,
   });
});

const removeFaculties = catchAsync(async (req, res) => {
   const { courseId } = req.params;
   const result = await CourseServices.removeFaculties(courseId, req.body);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculties removed successfully",
      data: result,
   });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
   const { id } = req.params;
   const result = await CourseServices.deleteSingleCourse(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course deleted successfully",
      data: result,
   });
});

export const CourseController = {
   createCourse,
   getAllCourses,
   getSingleCourse,
   getFacultyWithCourse,
   updateCourse,
   assignFaculties,
   removeFaculties,
   deleteSingleCourse,
};
