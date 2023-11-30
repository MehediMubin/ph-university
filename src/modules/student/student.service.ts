import { StudentModel } from "./student.model";

const getAllStudents = async () => {
   const students = await StudentModel.find();
   return students;
};

export const StudentServices = {
   getAllStudents,
};
