import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("./not-found/not-found"));
const StudentLayout = lazy(() => import("./student/student"));
const TeacherLayout = lazy(() => import("./teacher/teacher"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const Group = lazy(() => import("./groups/single-group"));
const Course = lazy(() => import("./course/course"));
const LayoutProtected = lazy(() => import("./protect-routes/layout-protect"));
const LoginProtected = lazy(() => import("./protect-routes/login-protect"));
const Worker = lazy(() => import("./worker/worker"));
const Branch = lazy(() => import("./branch/branch"));

export {
  SignIn,
  SignUp,
  NotFound,
  StudentLayout,
  TeacherLayout,
  AdminLayout,
  Groups,
  Group,
  LayoutProtected,
  LoginProtected,
  Worker,
  Course,
  Branch,
};
