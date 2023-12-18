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

export const AuthController = {
   loginUser,
};
