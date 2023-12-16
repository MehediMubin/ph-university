import AppError from "../../errors/AppError";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import hasTimeConflict from "./offeredCourse.utils";

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

   //    check if the department is belong to faculty
   const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
      _id: payload.academicDepartment,
      academicFaculty: payload.academicFaculty,
   });

   if (!isDepartmentBelongToFaculty)
      throw new AppError(400, "Department does not belong to faculty");

   // check if the same section already exists
   const isSectionExists = await OfferedCourseModel.findOne({
      academicSemester,
      course: payload.course,
      section: payload.section,
   });

   if (isSectionExists)
      throw new AppError(400, "Section for this course already exists");

   // get the schedules of the faculties
   const facultySchedules = await OfferedCourseModel.find({
      academicSemester,
      faculty: payload.faculty,
      days: { $in: payload.days },
   }).select("days startTime endTime");

   // check if the faculty has schedule conflict with the new schedule
   const { days, startTime, endTime } = payload;
   const newSchedule = { days, startTime, endTime };

   if (hasTimeConflict(facultySchedules, newSchedule)) {
      throw new AppError(400, "Faculty has schedule conflict");
   }

   const result = await OfferedCourseModel.create({
      ...payload,
      academicSemester,
   });
   return result;
};

export const OfferedCourseService = {
   createOfferedCourse,
};
