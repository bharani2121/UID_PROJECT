import React, { useState } from 'react'
import orderRequest from '../../api/Order/order.request';
import Dialog from '../../components/DialogComponent/Dialog'
import { applyToast } from '../../components/toast-message/toast';

export default function UpdateReservation(props) {
    const [newQuantity, setNewQuantity] = useState(0)
    const [newTotal, setNewTotal] = useState(0);
    const [max, setMax] = useState(false);
    const [min, setMin] = useState(false);
    const [status, setStatus] = useState('NEW');

    const handleIncrement = () =>{
        if(status === 'UPDATED'){
            if(newQuantity === props.item.quantity){
                let qty = props.item.quantity;
                let price = parseInt(props.item.price);
                setMax(true)
                setMin(false)
                setNewQuantity(qty);
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }else{
                let qty = parseInt(newQuantity) + 1;
                let price = parseInt(props.item.price);
                setNewQuantity(qty);
                setMin(false);
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }
            
        }else{
            if(parseInt(props.quantity) === props.item.quantity){
                let qty = props.item.quantity;
                let price = parseInt(props.item.price);
                setNewQuantity(qty);
                setMax(true)
                setMin(false)
                setStatus('UPDATED')
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }else{
                let qty = parseInt(props.quantity) + 1;
                let price = parseInt(props.item.price);
                setNewQuantity(qty);
                setMin(false)
                setStatus('UPDATED')
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }
            
        }
    }

    const handleDecrement = () =>{
        if(status === 'UPDATED'){
            if(newQuantity === 0) {
                parseInt(newQuantity);
                setMin(true);
                setMax(false);
            }else{
                let qty = parseInt(newQuantity) - 1;
                let price = parseInt(props.item.price);
                setMax(false);
                setNewQuantity(qty);
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }
        }else{
            if(props.quantity === 0) {
                parseInt(props.quantity);
                setMax(false);
            }else{
                let qty = parseInt(props.quantity) - 1;
                let price = parseInt(props.item.price);
                setNewQuantity(qty);
                setMax(false)
                setStatus('UPDATED')
                let totalPrice = price * qty
                setNewTotal(totalPrice);
            }
        }
    }
    
    const handleUpdate = (id) =>{
        if(newQuantity === 0){
            applyToast('Order detail update failed!', 'error');
        }else{
            props.order.quantity = newQuantity;
            props.order.total = newTotal;
            props.order.status = 'Pending'
            orderRequest.updateOrderDetails(id, props.order)
            .then((response) =>{
                props.getOrders()
                applyToast('Order details updated successfully!', 'success');
                setStatus('NEW')
            }).catch((error) =>{
                console.error(error);
                applyToast('Order detail update failed!', 'error');
            })
        }
        
    }

    const reset = () =>{
        setStatus('NEW')
        setMax(false);
        setMin(false);
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
                    <h3 className="mt-5 px-5 text-lg font-semibold">
                        User Details
                    </h3>
                    <div className="mt-3 px-5 grid grid-cols-2 lg:grid lg:grid-cols-6 lg:gap-x-6">
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            First Name :
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{props.buyer.firstName}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Last Name  : 
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{props.buyer.lastName}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Email :  
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{props.buyer.email}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Contact No : 
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2"> {props.buyer.contactNo}</h4>
                    </div>
                    <div className="mt-5 flex-grow border-t border-gray-300"></div>
                    <h3 className="mt-5 px-5 text-lg font-semibold">
                        Item Details
                    </h3>
                    <div className="mt-3 px-5 grid grid-cols-2 lg:grid lg:grid-cols-6 lg:gap-x-6">
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Item Name :
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{props.item.name}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Seller Name  : 
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{props.seller.firstName} {props.seller.lastName}</h4>
                        <div className="lg:mt-4 px-5 font-medium col-span-2 lg:col-span-3  grid grid-cols-2 lg:grid lg:grid-cols-3">
                            <h3 className='text-base font-semibold col-span-1 lg:col-span-1 mt-5'>Quantity :</h3>
                            <div className="flex flex-row h-10 w-full rounded-lg col-span-1 relative bg-transparent lg:col-span-2  mt-5 lg:mt-5lg:col-span-2 lg:px-5">
                                {
                                    min === true || props.quantity === 0?
                                    <>
                                        <button onClick={handleDecrement} className=" bg-gray-300 text-gray-600 h-7 w-10 rounded-l cursor-not-allowed disabled">
                                            <span className="m-auto text-2xl font-thin">−</span>
                                        </button>
                                    </>:
                                    <>
                                        <button onClick={handleDecrement} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-7 w-10 rounded-l cursor-pointer outline-none">
                                            <span className="m-auto text-2xl font-thin">−</span>
                                        </button>
                                    </>
                                }
                                <>
                                    {
                                            status === 'UPDATED' ?
                                                <>
                                                    <h4 className='px-2 py-0.5'> 
                                                        {newQuantity}
                                                    </h4>
                                                </>:
                                                <>
                                                    <h4 className='px-2 py-0.5'> 
                                                        {props.quantity}
                                                    </h4>
                                                </>
                                        }
                                </>
                                {
                                    max === true?
                                    <>
                                        <button onClick={handleIncrement} className="bg-gray-300 text-gray-600 h-7 w-10 rounded-r cursor-not-allowed" disabled>
                                            <span className="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </>:
                                    <>
                                        <button onClick={handleIncrement} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-7 w-10 rounded-r cursor-pointer">
                                            <span className="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="lg:mt-4 px-5 font-medium col-span-2 lg:col-span-3 lg:grid lg:grid-cols-3">
                            <div className=" col-span-1 lg:col-span-1 text-base font-semibold mt-4">
                                Order Price : 
                            </div>
                            <div className='col-span-1 mt-3 lg:col-span-2 lg:px-4'>
                                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 h-9 w-10 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    LKR
                                </span>
                                {
                                    status === 'UPDATED'?
                                    <>
                                        <input type="text" name="total" className="rounded-none border p-0.5 h-9 w-40" placeholder="Price" value={newTotal}/>
                                    </>:
                                    <>
                                        <input type="text" name="total" className="rounded-none border p-0.5 h-9 w-40" placeholder="Price" value={props.total}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
            close={reset}
            action={()=> handleUpdate(props.orderId)}
            buttonName="Update"
        />
    </div>
  )
}
