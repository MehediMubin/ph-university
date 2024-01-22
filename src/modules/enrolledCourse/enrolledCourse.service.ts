import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import { StudentModel } from "../student/student.model";
import { SemesterRegistrationModel } from "./../semesterRegistration/semesterRegistration.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourseModel } from "./enrolledCourse.model";

const createEnrolledCourse = async (
   user: JwtPayload,
   payload: TEnrolledCourse,
) => {
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
      const { offeredCourse } = payload;

      const isOfferedCourseExists =
         await OfferedCourseModel.findById(offeredCourse);
      if (!isOfferedCourseExists)
         throw new AppError(404, "Offered course not found");

      if (isOfferedCourseExists.maxCapacity == 0) {
         throw new AppError(400, "No seat available");
      }

      // get student id
      const student = await StudentModel.findOne({ id: user.id });

      if (!student) throw new AppError(404, "Student not found");

      // check if this user is already enrolled in this course
      const isEnrolledCourseExists = await EnrolledCourseModel.findOne({
         student: student._id,
         offeredCourse,
      });

      if (isEnrolledCourseExists)
         throw new AppError(400, "You are already enrolled in this course");

      const semesterRegistration = await SemesterRegistrationModel.findById(
         isOfferedCourseExists.semesterRegistration,
      ).select("maxCredit");

      // check if student's credit is greater than max credit
      const enrolledCourses = await EnrolledCourseModel.aggregate([
         {
            $match: {
               student: student._id,
               isEnrolled: true,
            },
         },
         {
            $lookup: {
               from: "courses",
               localField: "course",
               foreignField: "_id",
               as: "course",
            },
         },
         {
            $unwind: "$course",
         },
         {
            $group: {
               _id: null,
               totalCredit: { $sum: "$course.credit" },
            },
         },
      ]);

      const course = await CourseModel.findById(isOfferedCourseExists.course);
      if (!course) throw new AppError(404, "Course not found");

      const totalCredits = enrolledCourses[0].totalCredit + course.credit;

      payload.semesterRegistration = isOfferedCourseExists.semesterRegistration;
      payload.academicSemester = isOfferedCourseExists.academicSemester;
      payload.academicFaculty = isOfferedCourseExists.academicFaculty;
      payload.academicDepartment = isOfferedCourseExists.academicDepartment;
      payload.course = isOfferedCourseExists.course;
      payload.student = student._id;
      payload.faculty = isOfferedCourseExists.faculty;
      payload.isEnrolled = true;

      if (
         semesterRegistration &&
         totalCredits > semesterRegistration.maxCredit
      ) {
         throw new AppError(400, "You have exceeded your max credit");
      }

      // create enrolled course
      const result = await EnrolledCourseModel.create([payload], { session });

      if (!result) throw new AppError(500, "Internal server error");

      // update max capacity
      await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
         $inc: { maxCapacity: -1 },
      });

      await session.commitTransaction();
      session.endSession();

      return result;
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
};

const updateEnrolledCourseMarks = async (
   facultyId: string,
   payload: Partial<TEnrolledCourse>,
) => {
   const { semesterRegistration, offeredCourse, student, courseMarks } =
      payload;

   const isSemesterRegistrationExists =
      await SemesterRegistrationModel.findById(semesterRegistration);
   if (!isSemesterRegistrationExists) {
      throw new AppError(404, "Semester registration not found");
   }

   const isOfferedCourseExists =
      await OfferedCourseModel.findById(offeredCourse);
   if (!isOfferedCourseExists) {
      throw new AppError(404, "Offered course not found");
   }

   const isStudentExists = await StudentModel.findById(student);
   if (!isStudentExists) {
      throw new AppError(404, "Student not found");
   }

   const faculty = await FacultyModel.findOne({ id: facultyId });
   if (!faculty) {
      throw new AppError(404, "Faculty not found");
   }

   const result = await EnrolledCourseModel.findOneAndUpdate(
      {
         semesterRegistration,
         offeredCourse,
         student,
         faculty: faculty._id,
      },
      {
         courseMarks,
      },
      { new: true },
   );
   if (!result) throw new AppError(500, "Internal server error");

   return result;
};

export const EnrolledCourseService = {
   createEnrolledCourse,
   updateEnrolledCourseMarks,
};
