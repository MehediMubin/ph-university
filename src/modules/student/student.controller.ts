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

const getSingleStudent = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { id } = req.params;
      const student = await StudentServices.getSingleStudent(id);

      sendResponse(res, {
         statusCode: 200,
         success: true,
         message: "Student fetched successfully",
         data: student,
      });
   } catch (err) {
      next(err);
   }
};

const deleteSingleStudent = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { id } = req.params;
      const result = await StudentServices.deleteSingleStudent(id);
      sendResponse(res, {
         statusCode: 200,
         success: true,
         message: "Student deleted successfully",
         data: result,
      });
   } catch (err) {
      next(err);
   }
};

export const StudentController = {
   getAllStudents,
   getSingleStudent,
   deleteSingleStudent,
};
