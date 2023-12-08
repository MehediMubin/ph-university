import { z } from "zod";

const preRequisiteValidationSchema = z.object({
   course: z.string(),
   isDeleted: z.boolean().optional(),
});

const courseValidationSchema = z.object({
   body: z.object({
      title: z.string(),
      prefix: z.string(),
      code: z.number(),
      credit: z.number(),
      preRequisiteCourses: z.array(preRequisiteValidationSchema).optional(),
      isDeleted: z.boolean().default(false).optional(),
   }),
});

export const CourseValidations = {
   createCourse: courseValidationSchema,
};
