import { Types } from "mongoose";

export type TName = {
   firstName: string;
   middleName?: string;
   lastName: string;
};

export type TFaculty = {
   id: string;
   designation: string;
   name: TName;
   gender: "male" | "female" | "other";
   dateOfBirth?: Date;
   email: string;
   contactNumber: string;
   emergencyContactNumber: string;
   presentAddress: string;
   permanentAddress: string;
   profileImage?: string;
   academicFaculty: Types.ObjectId;
   academicDepartment: Types.ObjectId;
   isDeleted: boolean;
};
