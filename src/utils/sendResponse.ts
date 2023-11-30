import { Response } from "express";

const sendResponse = (res: Response, data) => {
   const { statusCode, success, message, data: result } = data;

   res.status(statusCode).json({
      success,
      message,
      data: result,
   });
};

export default sendResponse;
