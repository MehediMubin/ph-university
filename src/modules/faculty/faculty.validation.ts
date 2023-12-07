import { z } from "zod";

const nameValidationSchema = z.object({
   firstName: z.string().min(1).max(20),
   middleName: z.string(),
   lastName: z.string(),
});

const facultyValidationSchema = z.object({
   body: z.object({
      password: z.string().max(20),
      faculty: z.object({
         name: nameValidationSchema,
         gender: z.enum(["male", "female", "other"]),
         dateOfBirth: z.string().optional(),
         email: z.string().email(),
         contactNumber: z.string(),
         emergencyContactNumber: z.string(),
         designation: z.string(),
         presentAddress: z.string(),
         permanentAddress: z.string(),
         profileImage: z.string().optional(),
         academicFaculty: z.string(),
         academicDepartment: z.string(),
      }),
   }),
});

const updateFacultyValidationSchema = z.object({
   body: z.object({
      faculty: z.object({
         name: nameValidationSchema.optional(),
         gender: z.enum(["male", "female", "other"]).optional(),
         dateOfBirth: z.string().optional(),
         email: z.string().email().optional(),
         contactNumber: z.string().optional(),
         emergencyContactNumber: z.string().optional(),
         designation: z.string().optional(),
         presentAddress: z.string().optional(),
         permanentAddress: z.string().optional(),
         profileImage: z.string().optional(),
         academicFaculty: z.string().optional(),
         academicDepartment: z.string().optional(),
      }),
   }),
});

export const facultyValidations = {
   createFaculty: facultyValidationSchema,
   updateFaculty: updateFacultyValidationSchema,
};
