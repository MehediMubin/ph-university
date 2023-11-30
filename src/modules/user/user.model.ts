import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
   {
      id: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      needsPasswordChange: {
         type: Boolean,
         default: true,
      },
      role: {
         type: String,
         enum: ["admin", "faculty", "student"],
         required: true,
      },
      status: {
         type: String,
         enum: ["in-progress", "blocked"],
         default: "in-progress",
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   },
);

userSchema.pre("save", function (next) {
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this;
   user.password = bcrypt.hashSync(user.password, Number(config.bcrypt_salt));
   next();
});

userSchema.post("save", function (doc, next) {
   doc.password = "";
   next();
});

export const UserModel = model<TUser>("User", userSchema);
