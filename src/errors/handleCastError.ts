import mongoose from "mongoose";
import { TErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
   return {
      statusCode: 400,
      message: "Invalid Request!",
      errorSources: [
         {
            path: err.path,
            message: `Invalid ${err.path}: ${err.value}`,
         },
      ],
   };
};

export default handleCastError;
