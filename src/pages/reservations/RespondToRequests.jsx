import React from 'react'
import itemRequest from '../../api/Item/item.request'
import orderRequest from '../../api/Order/order.request'
import Button from '../../components/buttons/Buttons'
import Dialog from '../../components/DialogComponent/Dialog'
import { applyToast } from '../../components/toast-message/toast'
import emailJs from '@emailjs/browser'

export default function RespondToRequests(props) {
    let emailParameters = {
        reciever:props.buyer.firstName + ' ' + props.buyer.lastName,
        subject:'Regarding the Order Request',
        message:'',
        sender:props.seller.firstName + ' ' + props.seller.lastName,
        reply_to:props.buyer.email,
        from:process.env.REACT_APP_EMAIL
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
    const handleResponse = (action) =>{
        switch(action) {
            case 'ACCEPTED':{
                let updatedItem = props.item
                let updatedQuantity = Math.ceil(props.item.quantity - props.order.quantity)
                if(updatedQuantity >= 0){
                    updatedItem.quantity = updatedQuantity;
                    itemRequest.updateItem(updatedItem, props.item._id)
                    .then((response) =>{
                        updatedQuantity = 0
                        props.order.status = 'Accepted';
                        //Email Parameters
                        emailParameters.message = 'The order request placed with the order ID:' + props.order.orderId + ' has been Accepted!'
                        orderRequest.updateOrderDetails(props.order._id, props.order)
                        .then((response) =>{
                            applyToast('Order Request Accepted!', 'success');
                            props.getOrders();
                            //Email Functionality
                            handleEmail(emailParameters);
                        }).catch((error) =>{
                            applyToast('Order Request Accept Failed!', 'error');
                            console.error(error.message)
                        })
                        applyToast('Item Inventory updated!', 'success');
                    }).catch((error) =>{
                        applyToast('Item Inventory update Failed!', 'error');
                        console.error(error.message)
                    })
                    break;
                }else{
                    applyToast('Not Enough items in inventory to fulfill the request!', 'error')
                    break;
                }
            }
            case 'REJECTED':{
                if(props.order.status === 'Pending'){
                    props.order.status = 'Rejected';
                    //Email Parameters
                    emailParameters.message = 'The order request placed with the order ID:' + props.order.orderId + ' has been Rejected!'
                    orderRequest.updateOrderDetails(props.order._id, props.order)
                    .then((response) =>{
                        applyToast('Order Request Rejected!', 'success');
                        props.getOrders();
                        //Email Functionality
                        handleEmail(emailParameters);
                    }).catch((error) =>{
                        applyToast('Order Request Reject Failed!', 'error');
                        console.error(error.message);
                    })
                    break;
                }else{
                    let updatedItem = props.item;
                    let updatedQuantity = Math.ceil(props.item.quantity + props.order.quantity);
                    updatedItem.quantity = updatedQuantity;
                    itemRequest.updateItem(updatedItem, props.item._id)
                    .then((response) =>{
                        props.order.status = 'Rejected';
                        //Email Parameters
                        emailParameters.message = 'The order request placed with the order ID:' + props.order.orderId + ' has been Rejected!'
                        orderRequest.updateOrderDetails(props.order._id, props.order)
                        .then((response) =>{
                            applyToast('Order Request Rejected!', 'success');
                            props.getOrders();
                            //Email Functionality
                            handleEmail(emailParameters);
                        }).catch((error) =>{
                            applyToast('Order Request Reject Failed!', 'error');
                            console.error(error.message);
                        })
                        applyToast('Inventory Updated!', 'success');
                    }).catch((error) =>{
                        applyToast('Inventory Update Failed!', 'error');
                        console.error(error.message)
                    })
                    break;
                }
            }
            default:
        }
    }
  return (
    <div>
        <Dialog
            id={props.id}
            size='XL'
            title={props.title}
            content={
            <>
                <div className='lg:grid lg:grid-cols-4 lg:gap-x-5 lg:px-10'>
                    <div className='lg:w-72 lg:h-60 w-96 h-60 lg:col-span-1 mt-7 px-5'>
                        <img src={props.item.imageUrl} className='w-full h-full bg-white object-center object cover border' alt='Item'></img>
                    </div>
                    <div className="px-5 lg:col-span-3">
                    <br/>
                        <div className='lg:grid lg:grid-cols-3 mt-2'>
                            <div className='lg:col-span-3 grid grid-cols-2 lg:grid lg:grid-cols-6 text-gray-900'>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5  lg:mt-2'>Item Name :</h3>
                                <h4 className='text-base font-medium lg:col-span-2  mt-5 lg:mt-2'>{props.item.name}</h4>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Price :</h3>
                                <h4 className='text-base font-medium lg:col-span-2 mt-5 lg:mt-2'>Rs. {props.item.price} </h4>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Requested Quantity :</h3>
                                <h4 className='text-base font-medium lg:col-span-2 mt-5 lg:mt-5'>{props.order.quantity} </h4>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Available Quantity :</h3>
                                <h4 className='text-base font-medium lg:col-span-2 mt-5 lg:mt-5'>{props.item.quantity} </h4>
                            </div>
                        </div>
                        <div className="mt-5 flex-grow border-t border-gray-300"></div>
                        <div className='lg:grid lg:grid-cols-3 mt-2'>
                            <div className='lg:col-span-3 grid grid-cols-2 lg:grid lg:grid-cols-3 text-gray-900'>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Buyer's Name :</h3>
                                <h4 className='text-base font-medium lg:col-span-2  mt-5 lg:mt-2'>{props.buyer.firstName} {props.buyer.lastName}</h4>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Contact :</h3>
                                <h4 className='text-base font-medium lg:col-span-2 mt-5 lg:mt-2'>{props.buyer.contactNo} </h4>
                                <h3 className='text-base font-semibold lg:col-span-1 mt-5 lg:mt-2'>Email :</h3>
                                <h4 className='text-base font-medium lg:col-span-2 mt-5 lg:mt-2'>{props.buyer.email} </h4>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 lg:col-span-4'></div>
                </div>
                <div className='lg:grid lg:grid-cols-4 grid grid-cols-2'>
                    <div className='lg:col-span-2 justify-self-end transition duration-150 ease-in-out ml-1 col-span-1' data-bs-dismiss="modal">
                        <Button 
                            onClick={()=>handleResponse('ACCEPTED')} 
                            variant={'default'} 
                            disabled={props.order.status === 'Accepted' || props.order.status === 'Requested Reject'}
                        >
                            Accept
                        </Button>
                    </div>
                    <div className='lg:col-span-2 transition duration-150 ease-in-out ml-1 col-span-1' data-bs-dismiss="modal">
                        <Button 
                            onClick={()=>handleResponse('REJECTED')} 
                            variant={'red'} 
                            disabled={props.order.status === 'Rejected'}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            </>
            }
        />
    </div>
  )
}
