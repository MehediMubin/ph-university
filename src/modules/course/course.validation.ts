import { z } from "zod";

const preRequisiteValidationSchema = z.object({
   course: z.string(),
   isDeleted: z.boolean().optional(),
});

const courseValidationSchema = z.object({
   body: z.object({
      name: z.string(),
      prefix: z.string(),
      code: z.string(),
      credit: z.number(),
      preRequisiteCourses: z.array(preRequisiteValidationSchema),
   }),
});

export const CourseValidations = {
   createCourse: courseValidationSchema,
};
