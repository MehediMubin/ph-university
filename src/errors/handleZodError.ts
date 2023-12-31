import { ZodError, ZodIssue } from "zod";
import { TErrorResponse, TErrorSource } from "../interface/error";

const handleZodError = (error: ZodError): TErrorResponse => {
   const statusCode = 400;

   const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue) => {
      return {
         path: issue.path[issue.path.length - 1],
         message: issue.message,
      };
   });

   return {
      statusCode,
      message: "Validation Error!",
      errorSources,
   };
};

export default handleZodError;
