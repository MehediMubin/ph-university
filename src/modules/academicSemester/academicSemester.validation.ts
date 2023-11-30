import { z } from "zod";

const academicSemesterValidationSchema = z.object({
   body: z.object({
      name: z.enum(["Autumn", "Summer", "Fall"]),
      year: z.string(),
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

const updateAcademicSemesterValidationSchema = z.object({
   body: z.object({
      name: z.enum(["Autumn", "Summer", "Fall"]).optional(),
      year: z.string().optional(),
      code: z.enum(["01", "02", "03"]).optional(),
      startMonth: z
         .enum([
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
         ])
         .optional(),
      endMonth: z
         .enum([
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
         ])
         .optional(),
   }),
});

export const academicSemesterValidations = {
   createAcademicSemester: academicSemesterValidationSchema,
   updateAcademicSemester: updateAcademicSemesterValidationSchema,
};
