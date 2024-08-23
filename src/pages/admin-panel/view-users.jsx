import React, { useState, useEffect } from 'react'
import NavBar from '../../components/LayoutComponents/NavBar'
import _ from 'lodash';
import Table from '../../components/Table/Table';
import { findUsers } from '../../api/User/userApi';
import Editprofile from '../../components/Profile/EditProfile';
import Dialog from '../../components/dialog/Dialog';
import { applyToast } from '../../components/toast-message/toast';
import { BsFillTrashFill } from 'react-icons/bs';
import DeleteUser from '../../components/ManageAdminPanel/DeleteUser';
import Button from '../../components/buttons/Buttons';

export default function ViewAllUsers() {
    const [user, setUser] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [onClickUId, setOnClickUId] = React.useState(0);
    const [apiResponseWaiting, setApiResponseWaiting] = React.useState(false);
    const [search, setSearch] = useState("");

    const pageSize = 5;
    const [paginatedOrders, setPaginatedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editModelOpen, setEditModelOpen] = React.useState(false);

    const pageCount = users ? Math.ceil(users.length/pageSize) : 0;
    const pages = _.range(1, pageCount + 1);

    useEffect(() => {
        if(pageCount === 1) return null; 
    }, [pageCount]);

    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = () => {
        setApiResponseWaiting(true);
        findUsers()
          .then(res => {
            if(res.data.isSuccessful) {
                let userData = res.data.responseData;
                console.log(userData)
                setUsers(userData);
                setPaginatedOrders(_(userData).slice(0).take(pageSize).value());
                userData? setTimeout(function(){
                    setApiResponseWaiting(false);
                }, 500) : setApiResponseWaiting(false) && applyToast('Fetching failed. Try again!', 'error');
            } else {
                console.error("error");
            }
          })
          .catch(() => console.log("couldn't fetch"));
    };

    const pagination = (pageNo) =>{
        setCurrentPage(pageNo)
        const startIndex = (pageNo -1) * pageSize;
        const paginatedOrder = _(users).slice(startIndex).take(pageSize).value();
        setPaginatedOrders(paginatedOrder);
    };

    const setEditingUser = (payload) => {
        setUser(payload);
        setEditModelOpen(true);
    };

  return (
    <>
        <NavBar/>
        <br/>
        <div className="bg-gray-100">
            <div className='max-w-7xl mx-auto px-10 sm:px-10 lg:px-6'>
                <div className="max-w-2xl mx-auto py-5 lg:max-w-none">
                    <div className='lg:grid lg:grid-cols-2'>
                        <div className='col-span-1 mt-5 justify-self-start'>
                            <form>
                                <div className="flex justify-center">
                                    <div className="xl:w-96">
                                        <div className="input-group relative flex flex-wrap items-stretch w-full rounded">
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={(e) => { setSearch(e.target.value) }}
                                            className="form-control drop-shadow-2xl relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Search from the Email"
                                            aria-label="Search from the Email"
                                            aria-describedby="button-addon2"/>
                                        <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                            </svg>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </form><br/>
                        </div>
                        <div className='col-span-1 mt-5 justify-self-end'>
                            <a href="/users-report">
                                <Button className="drop-shadow-2xl" variant="red">
                                    User Report
                                </Button>
                            </a>
                        </div>
                    </div><br/>
                    <div className="" style={{marginTop: "-30px"}}>
                        <Table
                            head={
                                <>
                                    <tr>
                                        <th scope="col" className="py-3 px-6">#</th>
                                        <th scope="col" className="py-3 px-6">User ID</th>
                                        <th scope="col" className="py-3 px-6">User Name</th>
                                        <th scope="col" className="py-3 px-6">Email</th>
                                        <th scope="col" className="py-3 px-6">Contact</th>
                                        <th scope="col" className="py-3 px-6">User Role</th>
                                        <th scope="col" className="py-3 px-6">Actions</th>
                                    </tr>
                                </>
                            }
                            body={
                                apiResponseWaiting ?
                                    <>
                                        <center>
                                            <div className="flex justify-center items-center">
                                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-800" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </center>
                                    </> : 
                                    <>
                                        {
                                        paginatedOrders.filter((user) => {
                                            if (search === "") {
                                                return user;
                                            } else if (user.email.toLowerCase().includes(search.toLowerCase())) {
                                                return user;
                                            }
                                            }).map((user) =>(
                                            <>
                                            <tr className='self-center' key={user}>
                                                <td className='py-4 px-6'>
                                                    <img src={user?.pic} className="rounded-full w-10 shadow-lg" alt="Avatar" />
                                                </td>
                                                <td className='py-4 px-6'>{user?._id?.substring(0, 6) || '-'}</td>
                                                <td className='py-4 px-6'>{(user?.firstName + " " + user?.lastName)}</td>
                                                <td className='py-4 px-6'>{user?.email}</td>
                                                <td className='py-4 px-6'>{user?.contactNo}</td>
                                                <td className='py-4 px-6'>{user?.role}</td>
                                                <td className='py-4 px-6'>
                                                    <button className="" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" onClick={() => setEditingUser(user)}>
                                                        <img src="images/edit.jpg" className="rounded-full w-6 h-6 shadow-lg" alt="Edit" user={user}/>
                                                    </button>
                                                    <button onClick={() => setOnClickUId(user?._id)} className="pr-5 cursor-pointer text-red-800" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Request"><BsFillTrashFill className="w-6 h-6 ml-5" data-bs-toggle="modal" data-bs-target="#deleteUserAccount"/></button>
                                                </td>
                                                <div>
                                                    <DeleteUser
                                                        id='deleteUserAccount'
                                                        title="Remove User"
                                                        message="Are you sure to remove this user from the system? This cannot be undo."
                                                        userId={onClickUId}
                                                        onCallBackGetUsers={getUsers}
                                                    />
                                                </div>
                                            </tr>
                                            </>
                                        ))}
                                    </>
                            }
                            currentPage={currentPage}
                            pageCount={pageCount}
                            pages={pages}
                            pagination={pagination}
                        />
                    </div>
                </div>
                {editModelOpen &&
                    <Dialog onClose={() => setEditModelOpen(false)}>
                        <Editprofile userDetails={user} handleGetUser={getUsers} setEditModelOpen={setEditModelOpen}/>
                    </Dialog>
                }
            </div>
        </div><br/>
    </>
  )
}
