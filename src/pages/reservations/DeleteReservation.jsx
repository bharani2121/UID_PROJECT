import React from 'react'
import orderRequest from '../../api/Order/order.request';
import Dialog from '../../components/DialogComponent/Dialog'
import { applyToast } from '../../components/toast-message/toast';

export default function DeleteReservation(props) {
    const handleDelete = (id) =>{
        orderRequest.deleteOrderDetails(id)
        .then((response) =>{
            props.getOrders()
            applyToast('Order details deleted successfully!', 'success');
            props.getOrders();
        }).catch((error) =>{
            console.error(error);
            applyToast('Order details delete failed!', 'error')
        })
    }

  return (
    <div>
        <Dialog
            id={props.id}
            title={props.title}
            content={props.message}
            action={()=>handleDelete(props.itemId)}
            buttonName="Delete"
        />
    </div>
  )
}
