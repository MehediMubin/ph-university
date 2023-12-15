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

export const OfferedCourseController = {
   createOfferedCourse,
};
