import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
         invalid_type_error: "Name must be a string",
      }),
      academicFaculty: z.string({
         required_error: "academic faculty is required",
         invalid_type_error: "academic faculty must be a string",
      }),
   }),
});

const updateAcademicDepartmentValidationSchema = z.object({
   body: z.object({
      name: z
         .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
         })
         .optional(),
      academicFaculty: z
         .string({
            required_error: "academic faculty is required",
            invalid_type_error: "academic faculty must be a string",
         })
         .optional(),
   }),
});

export const academicDepartmentValidations = {
   create: academicDepartmentValidationSchema,
   update: updateAcademicDepartmentValidationSchema,
};
