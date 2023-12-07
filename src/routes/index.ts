import { Router } from "express";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
   {
      path: "/users",
      route: UserRoutes,
   },
   {
      path: "/students",
      route: StudentRoutes,
   },
   {
      path: "/faculties",
      route: FacultyRoutes,
   },
   {
      path: "/academic-semesters",
      route: AcademicSemesterRoutes,
   },
   {
      path: "/academic-faculties",
      route: academicFacultyRoutes,
   },
   {
      path: "/academic-departments",
      route: academicDepartmentRoutes,
   },
];

moduleRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
