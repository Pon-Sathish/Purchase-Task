import { Button } from "antd"
export const Buttons = ({ label, handleClick, style, ...props }) => {

    return <>
        <Button type="primary" {...props} style={style} onClick={handleClick}>{label}</Button>
    </>
}