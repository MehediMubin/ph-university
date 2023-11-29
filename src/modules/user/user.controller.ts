import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createStudent = async (req: Request, res: Response) => {
   const data = req.body;
   const parseData = userValidationSchema.parse(data);

   const result = await UserServices.createStudent(parseData);
   return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
   });
};

export const UserController = {
   createStudent,
};
