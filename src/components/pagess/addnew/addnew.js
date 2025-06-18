import { useState } from "react";
import { Createnew } from "../createnew/createnew";
import { Purchase } from "../purchase/purchase";
export const Addnew = () => {
    const [addnew, setAddnew] = useState(true);
    const addNew = () => {
        setAddnew(false)
    };
    const purchaseCancel = () => {
        setAddnew(true);
    };
    return <>
        {
            addnew ? <div>
                <Purchase addNew={addNew} />
            </div> : <Createnew purchaseCancel={purchaseCancel} />
        }
    </>
}