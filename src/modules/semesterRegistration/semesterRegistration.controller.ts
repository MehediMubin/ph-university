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

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
   const semesterRegistrations =
      await SemesterRegistrationService.getAllSemesterRegistrations(req.query);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester registrations fetched successfully",
      data: semesterRegistrations,
   });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
   const semesterRegistration =
      await SemesterRegistrationService.getSingleSemesterRegistration(
         req.params.id,
      );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester registration fetched successfully",
      data: semesterRegistration,
   });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
   const semesterRegistration =
      await SemesterRegistrationService.updateSemesterRegistration(
         req.params.id,
         req.body,
      );
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester registration updated successfully",
      data: semesterRegistration,
   });
});

export const SemesterRegistrationController = {
   createSemesterRegistration,
   getAllSemesterRegistrations,
   getSingleSemesterRegistration,
   updateSemesterRegistration,
};
