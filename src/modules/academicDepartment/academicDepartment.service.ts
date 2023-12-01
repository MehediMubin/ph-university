import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
   const result = await AcademicDepartmentModel.create(payload);
   return result;
};

const getAllAcademicDepartments = async () => {
   const result = await AcademicDepartmentModel.find();
   return result;
};

const getSingleAcademicDepartment = async (id: string) => {
   const result = await AcademicDepartmentModel.findById(id);
   return result;
};

const updateAcademicDepartment = async (
   id: string,
   payload: TAcademicDepartment,
) => {
   const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
      new: true,
   });
   return result;
};

export const AcademicDepartmentServices = {
   createAcademicDepartment,
   getAllAcademicDepartments,
   getSingleAcademicDepartment,
   updateAcademicDepartment,
};
