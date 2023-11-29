import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
   try {
      const { password, student } = req.body;

      // const parseData = userValidationSchema.parse();

      const result = await UserServices.createStudent(password, student);
      return res.status(201).json({
         success: true,
         message: "Student created successfully",
         data: result,
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong",
         error: err,
      });
   }
};

export const UserController = {
   createStudent,
};
