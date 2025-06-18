import { Route, Routes } from "react-router"
import { Sidebar } from "../../layouts/sidebar/sidebar"
import { Addnew } from "../addnew/addnew"
import { Login } from "../login/login"

export const Routers = () => {
    const islogin = sessionStorage.getItem("loginValue")
    // console.log(islogin, "route", sessionStorage.getItem("loginValue"));
    return (
        <>
            {islogin ?
                <Routes>
                    <Route path='/' element={<Sidebar />}>
                        <Route path='/purchase' element={<Addnew />} />
                    </Route>
                </Routes>
                :
                <Routes><Route path='/' element={<Login />} /> </Routes>}
        </>
    )
}