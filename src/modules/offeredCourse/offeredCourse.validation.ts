import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeSchema = z.string().refine(
   (time) => {
      const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
   },
   {
      message: "Invalid time format, expected format is HH:MM",
   },
);

const createOfferedCourseValidationSchema = z.object({
   body: z
      .object({
         semesterRegistration: z.string(),
         academicFaculty: z.string(),
         academicDepartment: z.string(),
         course: z.string(),
         faculty: z.string(),
         maxCapacity: z.number(),
         section: z.number(),
         days: z.array(z.enum([...Days] as [string, ...string[]])),
         startTime: timeSchema,
         endTime: timeSchema,
      })
      .refine(
         (body) => {
            const start = new Date(`01/01/2000 ${body.startTime}`);
            const end = new Date(`01/01/2000 ${body.endTime}`);

            return start < end;
         },
         {
            message: "Start time must be less than end time",
         },
      ),
});

const updateOfferedCourseValidationSchema = z.object({
   body: z
      .object({
         faculty: z.string(),
         maxCapacity: z.number(),
         days: z.array(z.enum([...Days] as [string, ...string[]])),
         startTime: timeSchema,
         endTime: timeSchema,
      })
      .refine(
         (body) => {
            const start = new Date(`01/01/2000 ${body.startTime}`);
            const end = new Date(`01/01/2000 ${body.endTime}`);

            return start < end;
         },
         {
            message: "Start time must be less than end time",
         },
      ),
});

export const OfferedCourseValidations = {
   create: createOfferedCourseValidationSchema,
   update: updateOfferedCourseValidationSchema,
};
