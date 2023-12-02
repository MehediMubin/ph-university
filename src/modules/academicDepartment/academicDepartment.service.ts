import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
   const result = await AcademicDepartmentModel.create(payload);
   return result;
};

const getAllAcademicDepartments = async () => {
   const result =
      await AcademicDepartmentModel.find().populate("academicFaculty");
   return result;
};

const getSingleAcademicDepartment = async (id: string) => {
   const result =
      await AcademicDepartmentModel.findById(id).populate("academicFaculty");
   return result;
};

const updateAcademicDepartment = async (
   id: string,
   payload: TAcademicDepartment,
) => {
   const result = await AcademicDepartmentModel.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
   );
   return result;
};

export const AcademicDepartmentServices = {
   createAcademicDepartment,
   getAllAcademicDepartments,
   getSingleAcademicDepartment,
   updateAcademicDepartment,
};
