import { UserModel } from "./user.model";

const createStudent = async (student) => {
   const newStudent = await UserModel.create(student);
   return newStudent;
};

export const UserServices = {
   createStudent,
};
