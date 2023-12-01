import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
         invalid_type_error: "Name must be a string",
      }),
      facultyId: z.string({
         required_error: "FacultyId is required",
         invalid_type_error: "FacultyId must be a string",
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
      facultyId: z
         .string({
            required_error: "FacultyId is required",
            invalid_type_error: "FacultyId must be a string",
         })
         .optional(),
   }),
});

export const academicDepartmentValidations = {
   create: academicDepartmentValidationSchema,
   update: updateAcademicDepartmentValidationSchema,
};
