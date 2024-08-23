import { useContext } from "react";
import { AuthContext } from "../../App";
import {useLocation} from 'react-router-dom';

export default function ProfileSideNav() {
    const loggedInUser = useContext(AuthContext);
    const {role} = loggedInUser;
    const location = useLocation();
    
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    return (
        <div className="w-30 md:w-60 h-60 bg-white px-1 absolute">
            <ul className="relative w-30 md:w-60">
                <li className="relative">
                    <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/profile" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                        <img src="/images/profile.svg" className="mr-2 md:mr-3 w-3 md:w-5 h-3 md:h-5"/>
                        {location.pathname === '/profile'?
                            <span className="text-xs md:text-sm text-red-800 hover:text-red-600 focus:text-red-600 decoration-red-800">Profile</span> :
                            <span className="text-xs md:text-sm text-gray-500 hover:text-red-600 focus:text-red-600">Profile</span>
                        }
                    </a>
                </li>
                <hr className="border-gray-200 dark:border-gray-700" />
                {role === "CLIENT" && (
                    <>
                        <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/my-reservations" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                <img src="/images/reserve.svg" className="mr-2 md:mr-3 w-3 md:w-5 h-3 md:h-5"/>
                                {location.pathname === '/my-reservations'?
                                    <span className="text-xs md:text-sm text-red-800 hover:text-red-600 focus:text-red-600 decoration-red-800">My Reservations</span> :
                                    <span className="text-xs md:text-sm text-gray-500 hover:text-red-600 focus:text-red-600">My Reservations</span>
                                }
                            </a>
                        </li>
                        <hr className="border-gray-200 dark:border-gray-700" />
                        <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/requests" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                <img src="/images/requests.svg" className="mr-2 md:mr-3 w-3 md:w-5 h-3 md:h-5"/>
                                {location.pathname === '/requests'?
                                    <span className="text-xs md:text-sm text-red-800 hover:text-red-600 focus:text-red-600 decoration-red-800">Reservation Requests</span> :
                                    <span className="text-xs md:text-sm text-gray-500 hover:text-red-600 focus:text-red-600">Reservation Requests</span>
                                }
                            </a>
                        </li>
                        <hr className="border-gray-200 dark:border-gray-700" />
                    </>
                )}
                <li className="relative">
                    <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" onClick={handleLogout} data-mdb-ripple="true" data-mdb-ripple-color="dark">
                        <img src="/images/logout.svg" className="mr-2 md:mr-3 w-3 md:w-5 h-3 md:h-5"/>
                        <span className="text-xs md:text-sm hover:text-red-600 focus:text-red-600">Logout</span>
                    </a>
                </li>
                <hr className="border-gray-200 dark:border-gray-700" />
            </ul>
        </div>
    );
}