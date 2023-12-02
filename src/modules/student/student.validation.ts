import { z } from "zod";

const nameValidationSchema = z.object({
   firstName: z.string().min(1).max(20),
   middleName: z.string(),
   lastName: z.string(),
});

const guardianValidationSchema = z.object({
   fatherName: z.string().min(1).max(20),
   fatherOccupation: z.string(),
   fatherContactNo: z.string(),
   motherName: z.string().min(1).max(20),
   motherOccupation: z.string(),
   motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
   name: z.string().min(1).max(20),
   occupation: z.string(),
   contactNo: z.string(),
   address: z.string(),
});

const studentValidationSchema = z.object({
   body: z.object({
      password: z.string().max(20),
      student: z.object({
         name: nameValidationSchema,
         gender: z.enum(["male", "female", "other"]),
         dateOfBirth: z.string().optional(),
         email: z.string().email(),
         contactNumber: z.string(),
         emergencyContactNumber: z.string(),
         bloodGroup: z
            .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
            .optional(),
         presentAddress: z.string(),
         permanentAddress: z.string(),
         guardian: guardianValidationSchema,
         localGuardian: localGuardianValidationSchema,
         profileImage: z.string().optional(),
         admissionSemester: z.string(),
         academicDepartment: z.string(),
      }),
   }),
});

const updateNameValidationSchema = z.object({
   firstName: z.string().min(1).max(20).optional(),
   middleName: z.string().optional(),
   lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
   fatherName: z.string().min(1).max(20).optional(),
   fatherOccupation: z.string().optional(),
   fatherContactNo: z.string().optional(),
   motherName: z.string().min(1).max(20).optional(),
   motherOccupation: z.string().optional(),
   motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
   name: z.string().min(1).max(20).optional(),
   occupation: z.string().optional(),
   contactNo: z.string().optional(),
   address: z.string().optional(),
});

const updateValidationSchema = z.object({
   body: z.object({
      student: z.object({
         name: updateNameValidationSchema.optional(),
         gender: z.enum(["male", "female", "other"]).optional(),
         dateOfBirth: z.string().optional(),
         email: z.string().email().optional(),
         contactNumber: z.string().optional(),
         emergencyContactNumber: z.string().optional(),
         bloodGroup: z
            .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
            .optional(),
         presentAddress: z.string().optional(),
         permanentAddress: z.string().optional(),
         guardian: updateGuardianValidationSchema.optional(),
         localGuardian: updateLocalGuardianValidationSchema.optional(),
         profileImage: z.string().optional(),
         admissionSemester: z.string().optional(),
         academicDepartment: z.string().optional(),
      }),
   }),
});

export const studentValidations = {
   createStudent: studentValidationSchema,
   updateStudent: updateValidationSchema,
};
