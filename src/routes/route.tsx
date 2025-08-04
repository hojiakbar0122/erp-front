import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from "../App"
import { SignIn, SignUp, NotFound, StudentLayout, TeacherLayout, Teacher, TeacherGroups, TeacherGroupStudents, AdminLayout, AdminProfile, Groups, Group, LayoutProtected, LoginProtected, Worker, Course, Branch } from "@pages"

const Router = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<LoginProtected><SignIn/></LoginProtected>}/>
                <Route path="sign-up" element={<SignUp/>}/>

                {/* ADMIN LAYOUT */}
                <Route path="admin" element={<LayoutProtected><AdminLayout/></LayoutProtected>}>
                    <Route index element={<Groups/>}/>
                    <Route path="groups" element={<Groups/>}/>
                    <Route path="groups/:id" element={<Group/>}/>
                    <Route path="courses" element={<Course/>}/>
                    <Route path="teachers" element={<Teacher/>}/>
                    <Route path="students" element={<StudentLayout/>}/>
                    <Route path="branches" element={<Branch/>}/>
                    <Route path="profile" element={<AdminProfile/>}/>
                </Route>

                {/* TEACHER LAYOUT */}
                <Route path="teacher" element={<LayoutProtected><TeacherLayout/></LayoutProtected>}>
                    <Route index element={<TeacherGroups/>}/>
                    <Route path="groups" element={<TeacherGroups/>}/>
                    <Route path="group-students/:id" element={<TeacherGroupStudents/>}/>
                    {/* <Route path="groups/:id" element={<Group/>}/>
                    <Route path="courses" element={<Course/>}/>
                    <Route path="teachers" element={<Teacher/>}/>
                    <Route path="students" element={<StudentLayout/>}/>
                    <Route path="branches" element={<Branch/>}/>
                    <Route path="profile" element={<AdminProfile/>}/> */}
                </Route>

                <Route path="worker" element={<Worker/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}

export default Router