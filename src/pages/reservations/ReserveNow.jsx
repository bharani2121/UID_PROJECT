import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import NavBar from '../../components/LayoutComponents/NavBar';
import Button from '../../components/buttons/Buttons';
import { findUsers } from '../../api/User/userApi';
import orderRequest from '../../api/Order/order.request';
import itemRequest from '../../api/Item/item.request';
import ID from 'nodejs-unique-numeric-id-generator';
import { AuthContext } from '../../App';
import { applyToast } from '../../components/toast-message/toast';

export default function ReserveNow() {
    const loggedInUser = useContext(AuthContext);
    const {userId} = loggedInUser;
    const params = useParams()
    const itemId = params.id;
    const [user, setUser] = useState({});
    const [item, setItem] = useState({});
    const [seller, setSeller] = useState({});
    const [order] = useState({
        buyer:userId,
        item:itemId,
        orderId:'',
        seller:'',
        quantity:0,
        status:'Pending',
        total:0
    })
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [max, setMax] = useState(false);
    const [min, setMin] = useState(false);

    useEffect(()=>{
        getUserDetails();
        getItemDetails();
    },[]);

    const getUserDetails = () =>{
        findUsers(`_id=${userId}`)
        .then((res) =>{
            setUser(res.data.responseData[0])
        }).catch((error) =>{
            console.error(error.message)
        })
    }

    const getItemDetails = () =>{
        itemRequest.getOneItem(itemId)
        .then((res) =>{
            setItem(res.data.data);
            setSeller(res.data.data.createdBy);
        }).catch((error) =>{
            console.error(error.message)
        })
    }

    const handleIncrement = () =>{
        if(parseInt(quantity) === item.quantity){
            let qty = item.quantity;
            let price = parseInt(item.price);
            setMax(true)
            setMin(false)
            setQuantity(qty);
            let totalPrice = price * qty
            setTotal(totalPrice);
        }else{
            let qty = parseInt(quantity) + 1;
            let price = parseInt(item.price);
            setQuantity(qty);
            setMin(false);
            let totalPrice = price * qty
            setTotal(totalPrice);
        }
    }

    const handleDecrement = () =>{
        if(quantity === 0) {
            parseInt(quantity);
            setMin(true);
            setMax(false);
        }else{
            let qty = parseInt(quantity) - 1;
            let price = parseInt(item.price);
            setMax(false);
            setQuantity(qty);
            let totalPrice = price * qty
            setTotal(totalPrice);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let newID = ID.generate(new Date().toJSON());
        order.orderId = "R" + newID;
        order.total = total;
        order.quantity = quantity;
        order.seller = seller._id
        orderRequest.saveOrder(order)
        .then((response) =>{
            console.log(response.data);
            applyToast('Order successfully created!', 'success');
            setTimeout(() => {
                setQuantity(0);
                setTotal(0)
                window.location=`/items`
              }, 1000);
           
        }).catch((error) =>{
            console.error(error.message);
            applyToast('Error in creating order!', 'error');
        })
    }  

  return item && user ?(
    <>
        <NavBar/>
        <br/>
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-6">
                <div className="max-w-2xl mx-auto py-5 lg:max-w-none place-self-center">
                    <div className='lg:justify-self-start lg:grid lg:grid-cols-1 grid grid-cols-1 '>
                        <h3 className="mt-5 text-xl font-semibold lg:justify-self-start justify-self-center">
                            Reserve Now
                        </h3>
                    </div>
                    <h3 className="mt-5 px-5 text-lg font-semibold">
                        User Details
                    </h3>
                    <div className="mt-3 px-5 grid grid-cols-2 lg:grid lg:grid-cols-6 lg:gap-x-6">
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            First Name :
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{user.firstName}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Last Name  : 
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{user.lastName}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Email :  
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2">{user.email}</h4>
                        <h3 className="mt-3 px-5 text-base font-semibold lg:col-span-1">
                            Contact No : 
                        </h3>
                        <h4 className="mt-4 px-5 font-medium lg:col-span-2"> {user.contactNo}</h4>
                    </div>
                    <div className="mt-5 flex-grow border-t border-gray-300"></div>
                    <h3 className="mt-7 px-5 text-lg font-semibold">
                        Item Details
                    </h3>
                    <div className='lg:grid lg:grid-cols-4 lg:gap-x-3 lg:px-10'>
                        <div className=' lg:w-72 lg:h-60 w-96 h-60 col-span-1 mt-7 '>
                            <img src={item.imageUrl} className='w-full h-full bg-white object-center object cover border' alt='Item'></img>
                        </div>
                        <div className=" px-5 col-span-3">
                        <br/>
                            <div className='lg:grid lg:grid-cols-3'>
                                <div className='col-span-2 grid grid-cols-2 lg:grid lg:grid-cols-3 text-gray-900'>
                                    <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Item Name :</h3>
                                    <h4 className='text-base font-medium lg:col-span-2  mt-5'>{item.name}</h4>
                                    <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Seller's Name :</h3>
                                    <h4 className='text-base font-medium lg:col-span-2 mt-5'>{seller.firstName} {seller.lastName}</h4>
                                    <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Price :</h3>
                                    <h4 className='text-base font-medium lg:col-span-2 mt-5'>Rs. {item.price} </h4>
                                    <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Quantity :</h3>
                                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent  mt-3 lg:mt-5lg:col-span-2">
                                        {
                                            min === true || quantity === 0?
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
                                        
                                        <h4 className='px-2 py-0.5'> {quantity}</h4>
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
                            </div>
                            <div className='lg:grid lg:grid-cols-5'>
                                <div className=" col-span-1 text-base font-semibold mt-3">
                                    Order Price : 
                                </div>
                                <div className='col-span-2 mt-3 lg:px-4'>
                                    <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 h-9 w-10 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        LKR
                                    </span>
                                    <input type="text" name="total" className="rounded-none border p-0.5 h-9 w-40" placeholder="Price" value={total}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex-grow border-t border-gray-300"></div>
                    <div className='mt-5 px-5 lg:grid lg:grid-cols-8 lg:self-end'>
                        <div className='lg:col-span-7'></div>
                        <div className='lg:col-span-1'> 
                            <Button onClick={handleSubmit} disabled={quantity === 0 || item.quantity === 0}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div><br/>
    </>
  ):(
    <div>
        <NavBar/>
        <br/>
            <div className='lg:justify-self-start lg:grid lg:grid-cols-1 grid grid-cols-1 '>
                <h3 className="mt-5 text-xl font-semibold lg:justify-self-start justify-self-center">
                    Reserve Now
                </h3>
            </div>
        <br/>
            <h2>Error in loading data!</h2>
    </div>
  )
}
