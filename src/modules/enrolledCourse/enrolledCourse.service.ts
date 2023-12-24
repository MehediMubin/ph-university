import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import { StudentModel } from "../student/student.model";
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

      payload.semesterRegistration = isOfferedCourseExists.semesterRegistration;
      payload.academicSemester = isOfferedCourseExists.academicSemester;
      payload.academicFaculty = isOfferedCourseExists.academicFaculty;
      payload.academicDepartment = isOfferedCourseExists.academicDepartment;
      payload.course = isOfferedCourseExists.course;
      payload.student = student._id;
      payload.faculty = isOfferedCourseExists.faculty;
      payload.isEnrolled = true;

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
      throw error; // rethrow the error
   }
};

export const EnrolledCourseService = {
   createEnrolledCourse,
};
