import { z } from "zod";

const userValidationSchema = z.object({
   id: z.string().max(20, { message: "id must be less than 20 characters" }),
   password: z
      .string()
      .max(20, { message: "password must be less than 20 characters" }),
   needsPasswordChange: z.boolean().default(true),
   role: z.enum(["admin", "faculty", "student"]),
   status: z.enum(["in-progress", "blocked"]).default("in-progress"),
   isDeleted: z.boolean().default(false),
});

export default userValidationSchema;
