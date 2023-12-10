import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";

const createCourse = async (payload: TCourse) => {
   const result = await CourseModel.create(payload);
   return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
   let page = 1;
   let limit = 0;
   let skip = 0;

   if (query?.limit) {
      limit = Number(query.limit);
   }

   if (query?.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
   }

   let searchQuery = "";
   if (query?.search) {
      searchQuery = query.search as string;
   }

   const result = await CourseModel.find({
      $or: CourseSearchableFields.map((field) => ({
         [field]: { $regex: searchQuery, $options: "i" },
      })),
   })
      .skip(skip)
      .limit(limit)
      .populate("preRequisiteCourses.course");

   return result;
};

const getSingleCourse = async (id: string) => {
   const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course",
   );
   return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
   const { preRequisiteCourses, ...remainingCourseData } = payload;

   const session = await CourseModel.startSession();

   try {
      session.startTransaction();
      const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
         id,
         remainingCourseData,
         { new: true, runValidators: true, session },
      );

      if (!updatedBasicCourseInfo) {
         throw new AppError(500, "Something went wrong");
      }

      if (preRequisiteCourses && preRequisiteCourses.length) {
         // fiter out the deleted fields
         const deletedPrerequisiteCourses = preRequisiteCourses
            .filter((preRequisiteCourse) => preRequisiteCourse.isDeleted)
            .map((preRequisiteCourse) => preRequisiteCourse.course);

         const deletedCourses = await CourseModel.findByIdAndUpdate(
            id,
            {
               $pull: {
                  preRequisiteCourses: {
                     course: { $in: deletedPrerequisiteCourses },
                  },
               },
            },
            { new: true, runValidators: true, session },
         );

         if (!deletedCourses) {
            throw new AppError(500, "Something went wrong");
         }

         const addedPreRequisiteCourses = preRequisiteCourses.filter(
            (preRequisiteCourse) => !preRequisiteCourse.isDeleted,
         );

         const addedCourses = await CourseModel.findByIdAndUpdate(
            id,
            {
               $addToSet: {
                  preRequisiteCourses: {
                     $each: addedPreRequisiteCourses,
                  },
               },
            },
            { new: true, runValidators: true, session },
         );

         if (!addedCourses) {
            throw new AppError(500, "Something went wrong");
         }
      }

      const result = await CourseModel.findById(id).populate(
         "preRequisiteCourses.course",
      );

      await session.commitTransaction();
      session.endSession();
      return result;
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new AppError(500, "Something went wrong");
   }
};

const assignFaculties = async (
   courseId: string,
   payload: Partial<TCourseFaculty>,
) => {
   const result = await CourseFacultyModel.findByIdAndUpdate(
      courseId,
      {
         course: courseId,
         $addToSet: {
            faculties: {
               $each: payload.faculties,
            },
         },
      },
      { upsert: true, new: true, runValidators: true },
   );

   return result;
};

const removeFaculties = async (courseId: string, payload: TCourseFaculty) => {
   const result = await CourseFacultyModel.findByIdAndUpdate(
      courseId,
      {
         $pull: {
            faculties: {
               $in: payload.faculties,
            },
         },
      },
      { new: true, runValidators: true },
   );

   return result;
};

const deleteSingleCourse = async (id: string) => {
   const result = await CourseModel.findByIdAndUpdate(
      id,
      {
         isDeleted: true,
      },
      { new: true },
   );
   return result;
};

export const CourseServices = {
   createCourse,
   getAllCourses,
   getSingleCourse,
   updateCourse,
   assignFaculties,
   removeFaculties,
   deleteSingleCourse,
};
