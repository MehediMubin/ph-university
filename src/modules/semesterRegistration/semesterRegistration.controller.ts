import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
   const semesterRegistration =
      await SemesterRegistrationService.createSemesterRegistraion(req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Semester registration created successfully",
      data: semesterRegistration,
   });
});

export const SemesterRegistrationController = {
   createSemesterRegistration,
};
