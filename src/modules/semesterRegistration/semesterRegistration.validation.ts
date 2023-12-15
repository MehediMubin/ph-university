import { z } from "zod";

const createSemesterRegistrationValidationSchema = z.object({
   body: z.object({
      academicSemester: z.string(),
      status: z.enum(["upcoming", "ongoing", "ended"]),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      minCredit: z.number(),
      maxCredit: z.number(),
   }),
});

export const SemesterRegistrationValidations = {
   create: createSemesterRegistrationValidationSchema,
};
