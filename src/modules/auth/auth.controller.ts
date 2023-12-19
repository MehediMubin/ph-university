import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
   const { id, password } = req.body;
   const user = await AuthService.loginUser(id, password);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: user,
   });
});

const changePassword = catchAsync(async (req, res) => {
   // console.log(req.user, req.body);
   const result = await AuthService.changePassword(req.user, req.body);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password changed successfully",
      data: result,
   });
});

export const AuthController = {
   loginUser,
   changePassword,
};
