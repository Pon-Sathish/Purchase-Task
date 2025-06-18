import { Col, Input, Row } from "antd";
import { loginimg } from "../../asets/imagess";
import { Buttons } from "../../genericComponents/buttons/button";
import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
export const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ userName: '', password: '' });

    const Sign = () => {
        // useEffect(() => {
        axios.post('http://192.168.1.6:8085/login', data)
            .then((res) => {
                localStorage.setItem("token", res.data?.result?.token)
                console.log(res.data?.result?.token, "res");
                console.log("login")
            })
            .catch((err) => {
                console.log(err, "err")
            })
        // }, [])
        sessionStorage.setItem("loginValue", "Success")
        navigate('/purchase');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev, [name]: value
        }));
    };

    console.log(data, "login")
    return <>
        <Row type="flex" justify="center" align="middle" style={{ width: '100%', height: '100vh' }}>
            <Col span={12} className="d-flex">
                <div className="login-content m-auto">
                    <h3 className="pb-3">Welcome Back !</h3>
                    <h2 style={{ color: 'rgba(0, 56, 255, 1)', }}>Sign in to</h2>
                    <p>Lorem ipsum is simply</p>
                    <p>User name</p>
                    <Input style={{ width: '100%', padding: '10px' }} placeholder="Enter Your User Name" name="userName" value={data.userName} onChange={handleChange} />
                    <p className="pt-3">Password</p>
                    <Input.Password style={{ width: '100%', padding: '10px' }} placeholder="Enter Your Password" name="password" value={data.password} onChange={handleChange} />
                    <div className="pt-5">
                        <Buttons size="large" handleClick={Sign} disabled={!(data.userName && data.password)} label={"Login"} />

                    </div>
                </div>
            </Col>
            <Col span={12}>
                <div className="login-img">
                    <img src={loginimg} alt="" />
                </div>
            </Col>
        </Row>
    </>
}