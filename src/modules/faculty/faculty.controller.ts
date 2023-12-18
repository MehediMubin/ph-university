import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res) => {
   console.log(req.user);
   const faculties = await FacultyServices.getAllFaculties();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculties fetched successfully",
      data: faculties,
   });
});

const getSingleFaculty = catchAsync(async (req, res) => {
   const { id } = req.params;
   const faculty = await FacultyServices.getSingleFaculty(id);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty fetched successfully",
      data: faculty,
   });
});

const updateSingleFaculty = catchAsync(async (req, res) => {
   const faculty = await FacultyServices.updateSingleFaculty(
      req.params.id,
      req.body.faculty,
   );

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty updated successfully",
      data: faculty,
   });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
   const { id } = req.params;
   const result = await FacultyServices.deleteSingleFaculty(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty deleted successfully",
      data: result,
   });
});

export const FacultyController = {
   getAllFaculties,
   getSingleFaculty,
   updateSingleFaculty,
   deleteSingleFaculty,
};
