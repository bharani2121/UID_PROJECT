import React, { useContext, useState, useEffect } from 'react'
import orderRequest from '../../api/Order/order.request';
import { AuthContext } from '../../App';
import NavBar from '../../components/LayoutComponents/NavBar'
import _ from 'lodash';
import Table from '../../components/Table/Table';
import {BsFillEyeFill} from 'react-icons/bs'
import RespondToRequests from './RespondToRequests';

export default function ReservationRequests() {
    const loggedInUser = useContext(AuthContext);
    const {userId} = loggedInUser;
    const sellerId = userId;
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({})
    const [buyer, setBuyer] = useState({})
    const [item, setItem] = useState({})
    const [seller, setSeller] = useState({})
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState("ASC")

    const getOrders = () =>{
        orderRequest.getOrderRequests(sellerId) 
        .then((res) =>{
            setOrders(res.data.data)
            setCurrentPage(1)
            setPaginatedOrders(_(res.data.data).slice(0).take(pageSize).value());
            setSortStatus("ASC")
        }).catch((error) =>{
            console.error(error.message)
        })
    }

    const handleOrder = (itemId) =>{
        orderRequest.getUserOrder(itemId)
        .then((response) =>{
            setOrder(response.data.data);
            setBuyer(response.data.data.buyer);
            setItem(response.data.data.item);
            setSeller(response.data.data.item.createdBy);
        })
    }

    //Sort Ascending function
    const sortAsc = () =>{
        let sortedOrders = orders.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        setOrders(sortedOrders)
        setPaginatedOrders(_(orders).slice(0).take(pageSize).value());
        setSortStatus('ASC')
    }
    
    //Sort Decending function
    const sortDesc = () =>{
        let sortedOrders = orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setOrders(sortedOrders)
        setPaginatedOrders(_(orders).slice(0).take(pageSize).value());
        setSortStatus('DESC')
    }

    useEffect(() =>{
        getOrders()
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

  return paginatedOrders.length !== 0?(
    <>
        <NavBar/>
        <br/>
        <div className="bg-gray-100">
            <div className='max-w-7xl mx-auto px-10 sm:px-10 lg:px-6'>
                <div className="max-w-2xl mx-auto py-5 lg:max-w-none">
                    <div className='lg:grid lg:grid-cols-2'>
                        <div className='col-span-1 mt-5'>
                            <h3 className='text-xl font-semibold'>Reservation Requests</h3>
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
                    </div><br/>
                    <div>
                        <Table
                            head={
                                <>
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Order ID
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Item Name
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Quantity
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Price
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Status
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Action
                                        </th>
                                    </tr>
                                </>
                            }
                            body={
                                <>
                                {
                                    paginatedOrders.filter((row)=>{
                                        if(search === ""){
                                            return row
                                        }else if(row.orderId.toLowerCase().includes(search.toLowerCase())){
                                            return row
                                        }
                                        }).map((row) =>(
                                        <tr className='self-center'>
                                            <td className='py-4 px-6'>{row.orderId}</td>
                                            <td className='py-4 px-6'>{row.item.name}</td>
                                            <td className='py-4 px-6'>{row.quantity}</td>
                                            <td className='py-4 px-6'>{row.total}</td>
                                            <td className={
                                                row.status === 'Accepted'?
                                                    'py-4 px-6 text-green-600 font-semibold'
                                                :
                                                row.status === 'Rejected' ?
                                                    'py-4 px-6 text-rose-700 font-semibold'
                                                :
                                                row.status === 'Requested Reject' ?
                                                    'py-4 px-6 text-yellow-600 font-semibold'
                                                :
                                                'py-4 px-6 font-semibold'
                                                }>{row.status}</td>
                                            <td>
                                                <div className="flex center-items text-2xl">
                                                    <div className="pr-5 cursor-pointer text-gray-900 py-3 px-6 lg:px-9" data-bs-toggle="tooltip" data-bs-placement="top" title="View Request"> 
                                                        <BsFillEyeFill data-bs-toggle="modal" data-bs-target="#requestDetails" onClick={()=>handleOrder(row._id)}/> 
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </> 
                            }
                            currentPage={currentPage}
                            pageCount={pageCount}
                            pages={pages}
                            pagination={pagination}
                        />
                        <RespondToRequests
                            id='requestDetails'
                            title="Request Details"
                            order={order}
                            buyer={buyer}
                            item={item}
                            seller={seller}
                            getOrders={getOrders}
                        />
                    </div>
                </div>
            </div>
        </div><br/>
    </>
  ):(
    <>
     <NavBar/>
        <br/>
        <div className="bg-gray-100">
            <div className='max-w-7xl mx-auto px-10 sm:px-10 lg:px-6'>
                <div className="max-w-2xl mx-auto py-5 lg:max-w-none">
                    <div className='col-span-1 mt-5'>
                        <h3 className='text-xl font-semibold'>No Reservation Requests Available</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
