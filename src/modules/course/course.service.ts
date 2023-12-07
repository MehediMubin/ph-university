import { CourseModel } from "./course.model";

const createCourse = async () => {
   const result = await CourseModel.create();
   return result;
};

const getAllCourses = async () => {
   const result = await CourseModel.find();
   return result;
};

const getSingleCourse = async (id: string) => {
   const result = await CourseModel.findById(id);
   return result;
};

// const updateSingleCourse = async (id: string, payload) => {
//    const result = await CourseModel.findByIdAndUpdate(id, payload, {
//       new: true,
//    });
//    return result;
// };

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
//    updateSingleCourse,
   deleteSingleCourse,
};
