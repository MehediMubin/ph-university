import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
   const errorSources: TErrorSource[] = Object.keys(err.errors).map((key) => {
      return {
         path: key,
         message: err.errors[key].message,
      };
   });

   return {
      statusCode: 400,
      message: "Validation Error!",
      errorSources,
   };
};

export default handleValidationError;
