import { Checkbox, Drawer } from 'antd';
import { Buttons } from '../../genericComponents/buttons/button';
import "./drawer.scss";
import { checkboxData } from './config'
export const Drawerpage = ({ open, handleClose, handlSubmit, handleChange, data }) => {

    // console.log(data, "data");
    return <>
        <Drawer
            title="Add Product"
            width='30%'
            key="right"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={handleClose}
            open={open}
            style={{
                borderRadius: '10px',
            }}
            footer={
                <div className="d-flex justify-content-center" style={{ height: '10vh' }}>
                    <div style={{ marginRight: '20px' }}>
                        <Buttons className="" style={{ backgroundColor: '#F9F0FF', color: '#0038FF', border: '1px solid #0038FF', padding: '25px 50px', fontSize: '16px', fontWeight: 'bold' }} handleClick={handleClose} label={"Cancel"} />
                    </div>
                    <div>
                        <Buttons disabled={!data?.length > 0} style={{ backgroundColor: '#0038FF', padding: '25px 50px', fontSize: '16px', fontWeight: 'bold' }} handleClick={handlSubmit} label={"Submit"} />
                    </div>
                </div>
            }
        >
            <div >
                <div className='checkBox-container'>
                    {
                        checkboxData?.map((ele) => <div className='checkBox my-4'>
                            <Checkbox
                                checked={data?.includes(ele.value)}
                                onChange={(e) => handleChange(ele.value, 'checkBox', e.target.checked,)}
                                name={ele.name}>{ele.value}</Checkbox> </div>)
                    }
                </div>
            </div>
        </Drawer>
    </>
}