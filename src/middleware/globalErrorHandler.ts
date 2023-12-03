import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
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

   const handleZodError = (error: ZodError) => {

      const errorSources: TErrorSource[] = error.issues.map(
         (issue: ZodIssue) => {
            return {
               path: issue.path[issue.path.length - 1],
               message: issue.message,
            };
         },
      );

      return {
         statusCode,
         message: "Validation Error!",
         errorSources,
      };
   };

   if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
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
