import { DatePicker, Form, Input } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { emptyImg } from "../../asets/imagess";
import { Buttons } from "../../genericComponents/buttons/button";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Drawerpage } from "../drawer/drawer";
import axios from "axios";
// import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
// const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
export const Createnew = ({ purchaseCancel }) => {
    const token = localStorage.getItem('token')
    // console.log(token,"ttt")
    const [form] = Form.useForm();

    const [formData, setFormdata] = useState({});
    const [data, setData] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showData, setShowData] = useState(false);

    const showPopup = () => {
        setData([]);
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const handleChange = (fieldValue, fieldName, checked) => {
        if (fieldName === 'checkBox') {
            setData((prevState) =>
                checked && fieldName === 'checkBox' ? [...prevState, fieldValue] : prevState.filter((a) => a !== fieldValue)
            )
        }
        else {
            setFormdata((prev) => ({ ...prev, [fieldName]: fieldValue }));
        }
        console.log(fieldName, "hiii")
    };
    // console.log(formData, "formdata");


    const handlSubmit = () => {
        setFormdata((prev) => ({ ...prev, products: data }));
        setShowData(true);
        setOpenDrawer(false);
    };
    // console.log(formData, "formdata");

    useEffect(() => {
        const checkValid = formData?.date && formData?.customerName && formData?.mobileNumber && formData?.location && formData?.description && formData?.products;
        setIsValid(checkValid);
    }, [formData]);


    const purchaseSave = () => {
        axios.post('http://192.168.1.6:8085/purchase', formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                console.log(res, "res")
            })
            .catch((err) => {
                console.log(err, "err")
            })
        // console.log(formData);
    };
    // Form
    return <>
        <div>
            <div>
                <h3 className="ps-4"><FaArrowLeft onClick={purchaseCancel} style={{ cursor: 'pointer' }} /> <span className="ps-3">Create New Purchase</span></h3>
            </div>
            <div className="container pt-5">
                <div className="row p-0 m-0">
                    <div className="col-6 p-0">
                        <Form form={form} layout="horizontal" {...formItemLayout}>
                            <Form.Item className="pt-5" name="date" label='Date' rules={[{ required: true }]}>
                                <DatePicker value={formData?.date || null} onChange={(inputValue, date) => handleChange(date, 'date')} style={{ width: '60%', borderRadius: '0px' }} />
                            </Form.Item>
                            <Form.Item className="pt-5" name="name" label='Customer Name' rules={[{ required: true }]}>
                                <Input value={formData?.customerName || ""} onChange={(inputValue) => handleChange(inputValue.target.value, 'customerName')} placeholder="Name" style={{ width: '60%', borderRadius: '0px', }} />
                            </Form.Item>
                            <Form.Item className="pt-5" name="number" label='Mobile Number' rules={[{ required: true }]}>
                                <Input value={formData?.mobileNumber || ""} onChange={(inputValue) => handleChange(inputValue.target.value, 'mobileNumber')} placeholder="Number" type="number" style={{ width: '60%', borderRadius: '0px' }} />
                            </Form.Item>
                            <Form.Item className="pt-5" name="location" label='Location' rules={[{ required: true }]}>
                                <Input value={formData?.location || ""} onChange={(inputValue) => handleChange(inputValue.target.value, 'location')} placeholder="Location" style={{ width: '60%', borderRadius: '0px' }} />
                            </Form.Item>
                            <Form.Item className="pt-5" name="description" label='Description' rules={[{ required: true }]}>
                                <TextArea value={formData?.description || ""} onChange={(inputValue) => handleChange(inputValue.target.value, 'description')} placeholder="Autosize height based on content lines=" style={{ width: '60%', borderRadius: '0px' }} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-6 text-center">
                        <div>
                            <div className="pt-5" style={{ height: '70vh' }}>
                                <div className="pt-5 d-flex justify-content-center ">
                                    <div className="d-flex flex-column w-100">
                                        {showData ? <h1 className="text-start">
                                            Selected Product
                                        </h1> : ""}
                                        {
                                            !showData ? <div className="d-flex justify-content-center"><img src={emptyImg} alt="emptyImg" style={{ display: 'block' }} className="pt-5" /> </div> : formData?.products?.map((ele) => {
                                                // return <div style={{ marginTop: '10px', border: '1px solid  rgb(207, 207, 207)', color: ' rgb(122, 122, 122)', borderRadius: '10px', padding: '15px 500px 15px 15px', textAlign: 'left', fontSize: '20px', }}>
                                                //     {ele}
                                                // </div>
                                                return <div className="card mt-3">
                                                    <ul type='none' className="text-start w-100">
                                                        <li className="card-body">
                                                            {ele}
                                                        </li>
                                                    </ul>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <Buttons type="dashed" handleClick={showPopup} label={"+ Add Product"} style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end" style={{ height: '10vh' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <Buttons className="" style={{ backgroundColor: '#F9F0FF', color: '#0038FF', border: '1px solid #0038FF', padding: '25px 50px', fontSize: '16px', fontWeight: 'bold' }} handleClick={purchaseCancel} label={"Cancel"} />
                                </div>
                                <div>
                                    <Buttons disabled={!isValid} style={{ backgroundColor: !isValid ? '#9996A0' : '#0038FF', padding: '25px 50px', fontSize: '16px', fontWeight: 'bold' }} label={"Save"} handleClick={purchaseSave} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {openDrawer && <Drawerpage open={openDrawer} handleClose={closeDrawer} handlSubmit={handlSubmit} handleChange={handleChange} data={data} />}
    </>
};