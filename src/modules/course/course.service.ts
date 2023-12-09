import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

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

   const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true },
   );

   if (preRequisiteCourses && preRequisiteCourses.length) {
      // fiter out the deleted fields
      const deletedPrerequisiteCourses = preRequisiteCourses
         .filter((preRequisiteCourse) => preRequisiteCourse.isDeleted)
         .map((preRequisiteCourse) => preRequisiteCourse.course);

      const deletedCourses = await CourseModel.findByIdAndUpdate(id, {
         $pull: {
            preRequisiteCourses: {
               course: { $in: deletedPrerequisiteCourses },
            },
         },
      });
   }

   return updatedBasicCourseInfo;
};

const deleteSingleCourse = async (id: string) => {
   const result = await CourseModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
   );
   return result;
};

export const CourseServices = {
   createCourse,
   getAllCourses,
   getSingleCourse,
   updateCourse,
   deleteSingleCourse,
};
