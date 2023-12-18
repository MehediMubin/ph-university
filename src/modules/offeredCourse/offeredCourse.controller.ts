import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
   const result = await OfferedCourseService.createOfferedCourse(req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "OfferedCourse created successfully",
      data: result,
   });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
   const result = await OfferedCourseService.updateOfferedCourse(
      req.params.id,
      req.body,
   );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OfferedCourse updated successfully",
      data: result,
   });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
   const result = await OfferedCourseService.getAllOfferedCourses();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully fetched all offeredCourses",
      data: result,
   });
});

export const OfferedCourseController = {
   createOfferedCourse,
   updateOfferedCourse,
   getAllOfferedCourses,
};
