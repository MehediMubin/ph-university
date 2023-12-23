import { z } from "zod";

const userValidationSchema = z.object({
   password: z
      .string({
         invalid_type_error: "password must be a string",
      })
      .max(20, { message: "password must be less than 20 characters" })
      .optional(),
});

const changeStatusValidationSchema = z.object({
   body: z.object({
      status: z.enum(["in-progress", "blocked"]),
   }),
});

export const UserValidations = {
   userValidationSchema,
   changeStatusValidationSchema,
}
