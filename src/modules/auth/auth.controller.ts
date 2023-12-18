import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
   const { id, password } = req.body;
   const user = await AuthService.loginUser(id, password);
});

export const AuthController = {
   loginUser,
};
