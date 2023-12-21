import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
   const { id, password } = req.body;
   const user = await AuthService.loginUser(id, password);

   const { refreshToken, ...rest } = user;

   // set refresh token in the cookie
   res.cookie("refreshToken", refreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
   });

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: rest,
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

const refreshToken = catchAsync(async (req, res) => {
   const { refreshToken } = req.cookies;
   const result = await AuthService.refreshToken(refreshToken);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Token refreshed successfully",
      data: result,
   });
});

const forgetPassword = catchAsync(async (req, res) => {
   const id = req.body.id;
   const result = await AuthService.forgetPassword(id);
   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reset link sent successfully",
      data: result,
   });
});

export const AuthController = {
   loginUser,
   changePassword,
   refreshToken,
   forgetPassword,
};
