import { TErrorResponse, TErrorSource } from "./../interface/error";

const handleDuplicateError = (error): TErrorResponse => {
   const errorSources: TErrorSource[] = Object.keys(error.keyValue).map(
      (key) => {
         return {
            path: key,
            message: `${key} is already taken!`,
         };
      },
   );

   return {
      statusCode: 400,
      message: "Duplicate Error!",
      errorSources,
   };
};

export default handleDuplicateError;
