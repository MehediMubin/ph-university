import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, TUserModel } from "./user.interface";

const userSchema = new Schema<TUser, TUserModel>(
   {
      id: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         select: 0,
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

userSchema.statics.isUserExistsById = async function (id: string) {
   const result = await UserModel.findOne({ id }).select("+password");
   return result;
};

userSchema.statics.isPasswordMatched = async function (
   password: string,
   hashedPassword: string,
) {
   const result = await bcrypt.compare(password, hashedPassword);
   return result;
};

export const UserModel = model<TUser, TUserModel>("User", userSchema);
