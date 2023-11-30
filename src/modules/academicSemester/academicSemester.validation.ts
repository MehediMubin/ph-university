import { z } from "zod";

const academicSemesterValidationSchema = z.object({
   body: z.object({
      name: z.enum(["Autumn", "Summer", "Fall"]),
      year: z.date(),
      code: z.enum(["01", "02", "03"]),
      startMonth: z.enum([
         "january",
         "february",
         "march",
         "april",
         "may",
         "june",
         "july",
         "august",
         "september",
         "october",
         "november",
         "december",
      ]),
      endMonth: z.enum([
         "january",
         "february",
         "march",
         "april",
         "may",
         "june",
         "july",
         "august",
         "september",
         "october",
         "november",
         "december",
      ]),
   }),
});

export const academicSemesterValidations = {
   createAcademicSemester: academicSemesterValidationSchema,
};
