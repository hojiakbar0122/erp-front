import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from "../App"
import { SignIn, SignUp, NotFound } from "@pages"

const Router = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}

export default Router