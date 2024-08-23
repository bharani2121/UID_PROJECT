import React from "react";
import itemRequest from "../../api/Item/item.request";
import Dialog from '../../components/DialogComponent/Dialog'
import { applyToast } from '../../components/toast-message/toast';

const DeleteItem = (props) => {

    const handleDelete = () => {
        itemRequest.deleteItem(props.itemId)
        .then((res) => {
            console.log(res);
            applyToast('Item successfully deleted!', 'success');
            window.location.reload();
        })
    }

    return(
        <div>
            <Dialog
            id={props.id}
            title={props.title}
            content={props.message}
            action={handleDelete}
            buttonName="Delete"
            />
        </div>
    );
}

export default DeleteItem