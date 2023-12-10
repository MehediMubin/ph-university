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

const updateCourseValidationSchema = z.object({
   body: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.number().optional(),
      credit: z.number().optional(),
      preRequisiteCourses: z.array(preRequisiteValidationSchema).optional(),
      isDeleted: z.boolean().default(false).optional(),
   }),
});

const courseFacultyValidationSchema = z.object({
   body: z.object({
      faculties: z.array(z.string()),
   }),
});

export const CourseValidations = {
   createCourse: courseValidationSchema,
   updateCourse: updateCourseValidationSchema,
   assignFaculties: courseFacultyValidationSchema,
};
