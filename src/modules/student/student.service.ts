import { path } from "path";
import { StudentModel } from "./student.model";

const getAllStudents = async () => {
   const students = await StudentModel.find()
      .populate("admissionSemester")
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      });
   return students;
};

const getSingleStudent = async (id: string) => {
   const student = await StudentModel.findOne({ id: id });
   return student;
};

const deleteSingleStudent = async (id: string) => {
   const result = await StudentModel.deleteOne({ id: id });
   return result;
};

export const StudentServices = {
   getAllStudents,
   getSingleStudent,
   deleteSingleStudent,
};
