import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const getAllStudents = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const students = await StudentServices.getAllStudents();
      sendResponse(res, {
         statusCode: 200,
         success: true,
         message: "Students fetched successfully",
         data: students,
      });
   } catch (err) {
      next(err);
   }
};

export const StudentController = {
   getAllStudents,
};
