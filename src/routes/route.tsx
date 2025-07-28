import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from "../App"
import { SignIn, SignUp, NotFound, StudentLayout, TeacherLayout, AdminLayout, Groups, LayoutProtected, LoginProtected, Worker, Course, Branch } from "@pages"

const Router = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<LoginProtected><SignIn/></LoginProtected>}/>
                <Route path="sign-up" element={<SignUp/>}/>

                {/* ADMIN LAYOUT */}
                <Route path="admin" element={<LayoutProtected><AdminLayout/></LayoutProtected>}>
                    <Route path="groups" element={<Groups/>}/>
                    <Route path="courses" element={<Course/>}/>
                    <Route path="teachers" element={<TeacherLayout/>}/>
                    <Route path="students" element={<StudentLayout/>}/>
                    <Route path="branches" element={<Branch/>}/>
                </Route>

                {/* TEACHER LAYOUT */}
                <Route path="teacher" element={<TeacherLayout/>}>
                </Route>

                {/* STUDENT LAYOUT
                <Route path="student" element={<StudentLayout/>}>                
                </Route> */}

                <Route path="worker" element={<Worker/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}

export default Router