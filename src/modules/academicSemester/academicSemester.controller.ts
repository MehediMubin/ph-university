import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
   const result = await AcademicSemesterServices.createAcademicSemester(
      req.body,
   );
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Academic Semester created successfully",
      data: result,
   });
});

export const academicSemesterController = {
   createAcademicSemester,
};
