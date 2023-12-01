import { z } from "zod";

const academicFacultyValidationSchema = z.object({
   body: z.object({
      name: z.string({
         invalid_type_error: "Name must be a string",
      }),
   }),
});

export const academicFacultyValidations = {
   create: academicFacultyValidationSchema,
   update: academicFacultyValidationSchema,
};
