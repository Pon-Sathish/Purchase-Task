import { LuBellDot } from "react-icons/lu";
import { Buttons } from "../../genericComponents/buttons/button";
import { useNavigate, Outlet } from "react-router";
export const Sidebar = () => {
    const navigate = useNavigate()
    const Logout = () => {
        sessionStorage.removeItem('loginValue')
        navigate('/')
    }
    return <>
        <div className="addnew-page">
            <div className="row sidebar p-0 m-0">
                <div className="col-2 p-0" style={{ backgroundColor: 'rgba(29, 29, 65, 1)', height: '100vh', position: 'relative' }}>
                    <div className="d-flex flex-column" >
                        <div style={{ height: '90vh' }}>
                            <h1 className="text-center pt-5 w-100" style={{ color: 'white' }}><span style={{ color: '#0038FF' }}>Tech</span>Lambdas</h1>
                        </div>

                        <div style={{ width: '100%', height: '10vh', display: 'flex', justifyContent: 'center' }}>
                            <Buttons label={"LogOut"} handleClick={Logout} className="w-75 p-2" style={{ backgroundColor: '#0038FF' }} />

                        </div>
                    </div>
                </div>
                <div className="col-10 p-0">
                    <div className="row p-3 m-2" style={{ borderBottom: '1px solid gray', paddingBottom: '5px' }}>
                        <h4 className="col-10" style={{ color: '#0038FF' }}>Purchase</h4>
                        <LuBellDot className="col-2 mt-1 ps-5" style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    </>
}