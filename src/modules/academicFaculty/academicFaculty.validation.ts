import { z } from "zod";

const academicFacultyValidationSchema = z.object({
   name: z.string({
      invalid_type_error: "Name must be a string",
   }),
});

const updateAcademicFacultyValidationSchema = z.object({
   body: z.object({
      name: z
         .string({
            invalid_type_error: "Name must be a string",
         })
         .optional(),
   }),
});

export const academicFacultyValidations = {
   create: academicFacultyValidationSchema,
   update: updateAcademicFacultyValidationSchema,
};
