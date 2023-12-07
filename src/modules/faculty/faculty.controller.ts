import { FacultyServices } from "./faculty.service";

const getAllFaculties = async () => {
   const faculties = await FacultyServices.getAllFaculties();
   return faculties;
};

const getSingleFaculty = async (id: string) => {
   const faculty = await FacultyServices.getSingleFaculty(id);
   return faculty;
};

const updateSingleFaculty = async (
   id: string,
   payload: Record<string, unknown>,
) => {
   const updatedFaculty = await FacultyServices.updateSingleFaculty(
      id,
      payload,
   );
   return updatedFaculty;
};

const deleteSingleFaculty = async (id: string) => {
   const deletedFaculty = await FacultyServices.deleteSingleFaculty(id);
   return deletedFaculty;
};

export const FacultyController = {
   getAllFaculties,
   getSingleFaculty,
   updateSingleFaculty,
   deleteSingleFaculty,
};
