import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
   let statusCode = error.statusCode || 500;
   let message = error.message || "Something went wrong";

   let errorSources: TErrorSource[] = [
      {
         path: "",
         message: "Something went wrong",
      },
   ];
   if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
   } else if (error?.name === "ValidationError") {
      const simplifiedError = handleValidationError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
   }

   res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.node_env === "development" ? error?.stack : null,
   });
   next();
};

export default globalErrorHandler;
