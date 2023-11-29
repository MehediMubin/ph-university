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
         dateOfBirth: z.date().optional(),
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
         admissionSemester: z.string().optional(),
      }),
   }),
});

export default studentValidationSchema;
