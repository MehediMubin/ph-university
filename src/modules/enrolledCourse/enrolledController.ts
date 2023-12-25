import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseService } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
   const result = await EnrolledCourseService.createEnrolledCourse(
      req.user,
      req.body,
   );
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Enrolled course created successfully",
      data: result,
   });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
   const facultyId = req.user.id;
   const result = await EnrolledCourseService.updateEnrolledCourseMarks(
      facultyId,
      req.body,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrolled course marks updated successfully",
      data: result,
   });
});

export const EnrolledCourseController = {
   createEnrolledCourse,
   updateEnrolledCourseMarks,
};
