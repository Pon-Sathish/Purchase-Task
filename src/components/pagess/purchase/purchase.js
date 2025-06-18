import { Input, Table } from "antd";
import { Buttons } from "../../genericComponents/buttons/button";
import axios from "axios";
import { useEffect, useState } from "react";
const { Search } = Input;

export const Purchase = ({ addNew }) => {
    const token = localStorage.getItem('token');
    const [serchData, setSearchData] = useState("");
    const [totalPage, setTotalPage] = useState();
    const [loading, setLoading] = useState(true);
    const [showData, setShowData] = useState([]);
    const colum = [
        {
            title: '',
            dataIndex: 'id'
        },
        {
            title: 'SNo',
            dataIndex: 'id',
            render: (value, idindex, index) => index + 1
        },
        {
            title: 'Invoice Date',
            dataIndex: 'date'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName'
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber'
        },
        {
            title: 'Location',
            dataIndex: 'location'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Action',
            dataIndex: 'Id'
        },
    ];
    const expandColumns = [
        {
            title: 'S.No',
            dataIndex: 'id',
            render: (value, idindex, index) => index + 1
        },
        {
            title: 'Product Name',
            dataIndex: 'products'
        }
    ];
    const onSearch = (value) => {
        setSearchData(value)
    };
    const expandedRowRender = (ele) => (
        // console.log(ele, "record"),
        <Table columns={expandColumns} dataSource={ele.products.map((item) => ({ products: item }))} pagination={false} />
    );
    const changePage = (action, value) => {
        console.log(action, value, "av")
        setTotalPage(action - 1, value)
    }
    useEffect(() => {
        axios.get(`http://192.168.1.6:8085/purchase?keyword=${serchData}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: totalPage,
                size: 7,
            }
        })
            .then((res) => {
                setTimeout(() => {
                    setLoading(false)
                }, 3000);
                setShowData(res?.data?.result?.message);
                console.log(res?.data?.result?.message, "res");
            })
            .catch((err) => {
                console.error(err, "err");
            });

    }, [serchData, token, totalPage]);
    // console.log(showData, "sd")
    return <>
        <div>
            <div className="row p-3 m-0">
                <div className="col-8"><h3>All Purchase</h3></div>
                <div className="col-2"> <Search placeholder="Search" style={{ borderRadius: '0px' }} allowClear onSearch={onSearch} /></div>
                <div className="col-2"><Buttons label={"+ Add New"} handleClick={addNew}
                    style={{ backgroundColor: '#0038FF', borderRadius: '0px', padding: '10px 20px' }} /></div>
            </div>
            <div className="pt-2"><Table columns={colum} dataSource={showData.content}
                pagination={{ pageSize: 7, total: showData.totalElements, onChange: (page, size) => changePage(page, size) }} expandable={{ expandedRowRender }} loading={loading} rowKey={(value, expand) => {
                    // console.log(value,expand,"hhhh")
                    return expand
                }} /></div>
        </div>
    </>
};