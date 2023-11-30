import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { password, student } = req.body;

      const result = await UserServices.createStudent(password, student);
      sendResponse(res, {
         statusCode: 201,
         success: true,
         message: "Student created successfully",
         data: result,
      });
   } catch (err) {
      next(err);
   }
};

export const UserController = {
   createStudent,
};
