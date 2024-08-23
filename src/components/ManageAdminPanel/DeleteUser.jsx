import React from "react";
import { deleteUser } from "../../api/User/userApi";
import Dialog from "../DialogComponent/Dialog";
import { applyToast } from "../toast-message/toast";

export default function DeleteUser(props) {
    const { id, title, message, onCallBackGetUsers, userId } = props;

    const handleDeleteUser = (id) =>{
        deleteUser(id)
        .then((data) =>{
            applyToast('User removed from the system successfully!', 'success');
            onCallBackGetUsers();
        }).catch((error) =>{
            console.error(error);
            applyToast('Failed!', 'error')
        })
    };

    return (
        <div>
            <Dialog
                id={id}
                title={title}
                content={message}
                action={() => handleDeleteUser(userId)}
                buttonName="Delete"
            />
        </div>
    );
}