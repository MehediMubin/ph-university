import { StudentModel } from "./student.model";

const getAllStudents = async () => {
   const students = await StudentModel.find();
   return students;
};

const getSingleStudent = async (id: string) => {
   const student = await StudentModel.findOne({ id: id });
   return student;
};

export const StudentServices = {
   getAllStudents,
   getSingleStudent,
};
