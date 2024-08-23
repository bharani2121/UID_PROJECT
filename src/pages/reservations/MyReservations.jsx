import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import orderRequest from '../../api/Order/order.request';
import { AuthContext } from '../../App';
import AccordionLayout from '../../components/Accordion/AccordionLayout';
import NavBar from '../../components/LayoutComponents/NavBar'
import UpdateReservation from './UpdateReservation';
import DeleteReservation from './DeleteReservation';
import DeleteAcceptedReservations from './DeleteAcceptedReservations';
import _ from 'lodash';

export default function MyReservations() {
    const loggedInUser = useContext(AuthContext);
    const {userId} = loggedInUser;
    const buyerId = userId;
    const [activeIndex, setActiveIndex] = useState(0);
    const [orders, setOrders] = useState([]);
    const [item, setItem] = useState({});
    const [seller, setSeller] = useState({});
    const [order, setOrder] = useState({});
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [buyer, setBuyer] = useState({});
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState("ASC")

    const getOrders = () =>{
        orderRequest.getUserOrders(buyerId)
        .then((response) =>{
            console.log(response.data.data)
            setOrders(response.data.data);
            setPaginatedOrders(_(response.data.data).slice(0).take(pageSize).value());
            setSortStatus('ASC')
        }).catch((error) =>{
            console.error(error.message);
        })
    }

    const handleItemDetails = (id) =>{
        orderRequest.getUserOrder(id)
        .then((response) =>{
            setOrder(response.data.data);
            setBuyer(response.data.data.buyer)
            setItem(response.data.data.item);
            setQuantity(response.data.data.quantity)
            setSeller(response.data.data.item.createdBy)
            setTotal(response.data.data.total)
        }).catch((error) =>{
            console.error(error.message);
        })
    }

    //Sort Ascending function
    const sortAsc = () =>{
        let sortedOrders = orders.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        setOrders(sortedOrders)
        setPaginatedOrders(_(orders).slice(0).take(pageSize).value());
        setSortStatus('ASC')
    }

    //Sort Descending function
    const sortDesc = () =>{
        let sortedOrders = orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setOrders(sortedOrders)
        setPaginatedOrders(_(orders).slice(0).take(pageSize).value());
        setSortStatus('DESC')
    }

    useEffect(() =>{
        getOrders();
    },[])

     //Pagination
     const pageSize = 5;
     const [paginatedOrders, setPaginatedOrders] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const pageCount = orders ? Math.ceil(orders.length/pageSize) : 0;
     const pages = _.range(1, pageCount + 1)
 
     const pagination = (pageNo) =>{
         setCurrentPage(pageNo)
         const startIndex = (pageNo -1) * pageSize;
         const paginatedOrder = _(orders).slice(startIndex).take(pageSize).value();
         setPaginatedOrders(paginatedOrder);
     }
 
  return orders ? (
   <>
    <NavBar/><br/>
    <div className="bg-gray-100">
        <div className='max-w-7xl mx-auto px-10 sm:px-10 lg:px-6'>
            <div className="max-w-2xl mx-auto py-5 lg:max-w-none">
                <div className='lg:grid lg:grid-cols-2'>
                    <div className='col-span-1 mt-5'>
                        <h3 className='text-xl font-semibold'>My Reservations</h3>
                    </div>
                    <div className='col-span-1 mt-5 justify-self-end'>
                        <form>
                        <div className="flex">
                            <div className="dropdown relative">
                                <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                   {
                                        sortStatus === 'ASC' ?
                                            'Oldest'
                                        :
                                        sortStatus === 'DESC' ?
                                            'Newest'
                                        :
                                            'Filter'
                                   }
                                    <svg aria-hidden="true" className="ml-1 w-4 h-4"  fill="currentColor"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" 
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={sortAsc}>Oldest</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={sortDesc}>Newest</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative w-full">
                                <input type="search" 
                                    id="search-dropdown" 
                                    className="block p-2.5 lg:w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                                    placeholder="Search..."
                                    value={search} onChange={(e)=>{ setSearch(e.target.value)}}/>
                            </div>
                        </div>
                        </form><br/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    {
                       paginatedOrders.filter((row)=>{
                        if(search === ""){
                            return row
                        }else if(row.orderId.toLowerCase().includes(search.toLowerCase())){
                            return row
                        }
                        }).map((row) =>(
                            <div onClick={()=>handleItemDetails(row._id)}>
                                <AccordionLayout 
                                    title={
                                        <>
                                            <div className='grid grid-cols-3'>
                                                <div className='col-span-1'>
                                                    ORDER ID : {row.orderId}
                                                </div>
                                                <div className='col-span-2 px-9'>
                                                    <div className={
                                                        row.status === 'Accepted'?
                                                            'text-green-600 font-semibold'
                                                        :
                                                        row.status === 'Rejected' ?
                                                            'text-rose-700 font-semibold'
                                                        :
                                                        row.status === 'Requested Reject' ?
                                                            'text-yellow-600 font-semibold'
                                                        :
                                                        'font-semibold'
                                                    }>
                                                        Status : {row.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    index={row._id}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                > 
                                    <div className='lg:grid lg:grid-cols-4 lg:gap-x-3'>
                                        <div className='relative w-72 h-60 col-span-1'>
                                            <img src={item.imageUrl} className='w-full h-full bg-white object-center object cover border' alt='Item'></img>
                                        </div>
                                        <div className=" px-5 col-span-3">
                                        <br/>
                                            <div className='lg:grid lg:grid-cols-3 grid grid-cols-1'>
                                                <div className='lg:col-span-2 grid grid-cols-2 lg:grid lg:grid-cols-3 text-gray-900'>
                                                        <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Item Name :</h3>
                                                        <h4 className='text-base font-medium lg:col-span-2  mt-5'>{item.name}</h4>
                                                        <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Seller's Name :</h3>
                                                        <h4 className='text-base font-medium lg:col-span-2 mt-5'>{seller.firstName} {seller.lastName}</h4>
                                                        <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Quantity :</h3>
                                                        <h4 className='text-base font-medium lg:col-span-2 mt-5'>{row.quantity} item(s)</h4>
                                                        <h3 className='text-base font-semibold lg:col-span-1 mt-5'>Price :</h3>
                                                        <h4 className='text-base font-medium lg:col-span-2 mt-5'>Rs. {row.total}</h4>
                                                </div>
                                                <div className='lg:col-span-1 lg:self-center justify-self-center col-span-1'>
                                                    <div className="flex center-items text-3xl pt-5">
                                                        <div className="pr-5 cursor-pointer text-gray-900" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Request"><BsPencilSquare data-bs-toggle="modal" data-bs-target="#updateReservationDetails"/></div>
                                                        <div className="pr-5 cursor-pointer text-red-800" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Request">
                                                            <BsFillTrashFill data-bs-toggle="modal" data-bs-target={
                                                                row.status === 'Accepted'?
                                                                    "#requestDeleteReservationDetails"
                                                                :
                                                                    "#deleteReservationDetails"
                                                                } 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <UpdateReservation
                                                        id='updateReservationDetails'
                                                        title="Update Reservation Details"
                                                        buyer={buyer}
                                                        seller={seller}
                                                        order={order}
                                                        item={item}
                                                        orderId={row._id}
                                                        quantity={quantity}
                                                        total={total}
                                                        getOrders={getOrders}
                                                    />
                                                </div>
                                                <div>
                                                    <DeleteReservation
                                                        id='deleteReservationDetails'
                                                        title="Delete Reservation Details"
                                                        message=" Are you sure that you want to delete this placed order?"
                                                        itemId={row._id}
                                                        getOrders={getOrders}
                                                    />
                                                </div>
                                                <div>
                                                    <DeleteAcceptedReservations
                                                        id="requestDeleteReservationDetails"
                                                        title="Delete Reservation Request"
                                                        buyer={buyer}
                                                        seller={seller}
                                                        order={order}
                                                        orderId={row._id}
                                                        getOrders={getOrders}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </AccordionLayout>
                            </div>
                        ))
                    }<br/>
                    <div className='w-full'>
                        <nav className="flex justify-between items-center pt-4 text-xs text-gray-700 uppercase bg-gray-50 py-2 px-3" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Page {currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pageCount}</span></span>
                        <span></span>
                        <ul className="inline-flex items-center -space-x-px">
                            {
                                pages.map((page) =>(
                                    <li>
                                        <p className={
                                            page === currentPage ? 
                                            "py-2 px-3 cursor-pointer leading-tight font-semibold text-white border border-gray-300 bg-gray-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            :
                                            "py-2 px-3 cursor-pointer leading-tight font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                                        onClick={()=>pagination(page)}
                                        >
                                        {page}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div><br/>
    </>
  ):(
    <div>
         <NavBar/><br/>
            <div className="bg-gray-100">
                <div className='max-w-7xl mx-auto px-10 sm:px-10 lg:px-6'>
                    <div className="max-w-2xl mx-auto py-5 lg:max-w-none">
                        <div className='lg:grid lg:grid-cols-2'>
                            <div className='col-span-1 mt-5'>
                                <h3 className='text-xl font-semibold'>My Reservations</h3>
                            </div>
                            <br/>
                            <h4 className='text-baseline font-semibold'>You have not placed any Reservations!</h4>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
