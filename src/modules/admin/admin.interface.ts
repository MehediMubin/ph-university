import { Types } from "mongoose";

export type TName = {
   firstName: string;
   middleName?: string;
   lastName: string;
};

export type TAdmin = {
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
   managementDepartment: string;
   isDeleted: boolean;
};
