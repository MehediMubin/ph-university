import AppError from "../../errors/AppError";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

const createOfferedCourse = async (payload: TOfferedCourse) => {
   // check if semester registration exists
   const isSemesterRegistrationExists =
      await SemesterRegistrationModel.findById(payload.semesterRegistration);
   if (!isSemesterRegistrationExists)
      throw new AppError(404, "Semester registration does not exist");

   const academicSemester = isSemesterRegistrationExists.academicSemester;

   // check if academic faculty exists
   const isAcademicFacultyExists = await AcademicFacultyModel.findById(
      payload.academicFaculty,
   );
   if (!isAcademicFacultyExists)
      throw new AppError(404, "Academic faculty does not exist");

   // check if academic department exists
   const isAcademicDepartmentExists = await AcademicDepartmentModel.findById(
      payload.academicDepartment,
   );
   if (!isAcademicDepartmentExists)
      throw new AppError(404, "Academic department does not exist");

   // check if course exists
   const isCourseExists = await CourseModel.findById(payload.course);
   if (!isCourseExists) throw new AppError(404, "Course does not exist");

   // check if faculty exists
   const isFacultyExists = await FacultyModel.findById(payload.faculty);
   if (!isFacultyExists) throw new AppError(404, "Faculty does not exist");

   const result = await OfferedCourseModel.create({
      ...payload,
      academicSemester,
   });
   return result;
};

export const OfferedCourseService = {
   createOfferedCourse,
};
