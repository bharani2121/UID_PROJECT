import React, { useState } from 'react'
import orderRequest from '../../api/Order/order.request'
import Dialog from '../../components/DialogComponent/Dialog'
import { applyToast } from '../../components/toast-message/toast'
import emailJs from '@emailjs/browser'

export default function DeleteAcceptedReservations(props) {
    const [message, setMessage] = useState()
    let emailParameters = {
        reciever:props.seller.firstName + ' ' + props.seller.lastName,
        subject:'Regarding the Order Request Cancellation',
        message:'',
        sender:props.buyer.firstName + ' ' + props.buyer.lastName,
        reply_to:props.seller.email,
        from:props.buyer.email
    }
    const handleChange = (e) =>{
        setMessage({...message, [e.target.name]: e.target.value})
    }
    const handleEmail = (emailParams) =>{
        emailJs.send(
            process.env.REACT_APP_SERVICE_ID, 
            process.env.REACT_APP_TEMPLATE_ID, 
            emailParams, 
            process.env.REACT_APP_PUBLIC_KEY
        )
        .then((response) =>{
            applyToast('Email sent successfully!', 'success');
            console.log('SUCCESS!', response.status, response.text);

        }, (error) =>{
            applyToast('Error in sending Email!', 'error');
            console.log('FAILED...', error);
        });
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        message.message = message.message + ' ' + 'OrderID:' + props.order.orderId
        emailParameters.message = message.message;
        let updatedOrder = props.order;
        updatedOrder.status = 'Requested Reject'
        orderRequest.updateOrderDetails(props.orderId, updatedOrder)
        .then((response) =>{
            applyToast('Cancellation request successfully sent!', 'success');
            props.getOrders();
            handleEmail(emailParameters);
        }).catch((error) =>{
            applyToast('Cancellation request sending failed!', 'error')
        })
    }
  return (
    <div>
        <Dialog
          id={props.id}
          size='XL'
          title={props.title}
          content={
            <>
                <div className='max-w-7xl mx-auto px-2 sm:px-10 lg:px-6'>
                    <h3 className="mt-2 px-5 text-lg font-semibold">
                        Delete Reason
                    </h3>
                    <div className="mt-5 px-5">
                        <textarea
                            type="text"
                            id="message"
                            name="message"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Enter the reason to delete the request!"
                            required=""
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </>
            
          }
          action={handleSubmit}
          buttonName="Request Delete"  
        />
    </div>
  )
}
