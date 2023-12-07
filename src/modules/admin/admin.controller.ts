import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import { FacultyServices } from "./faculty.service";

const getAllAdmins = catchAsync(async (req, res) => {
   const admins = await AdminServices.getAllAdmins();
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully",
      data: admins,
   });
});

const getSingleAdmin = catchAsync(async (req, res) => {
   const { id } = req.params;
   const admin = await AdminServices.getSingleAdmin(id);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully",
      data: admin,
   });
});

const updateSingleFaculty = catchAsync(async (req, res) => {
   const admin = await AdminServices.updateSingleAdmin(
      req.params.id,
      req.body.faculty,
   );

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin updated successfully",
      data: admin,
   });
});

const deleteSingleAdmin = catchAsync(async (req, res) => {
   const { id } = req.params;
   const result = await AdminServices.deleteSingleAdmin(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
   });
});

export const AdminController = {
   getAllAdmins,
   getSingleAdmin,
   updateSingleFaculty,
   deleteSingleAdmin,
};
