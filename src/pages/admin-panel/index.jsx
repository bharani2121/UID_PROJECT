import React, { useContext } from "react";
import { AuthContext } from "../../App";
import NavBar from "../../components/LayoutComponents/NavBar";
import Error404 from "../error";
import { FcServices, FcTodoList, FcPaid, FcPositiveDynamic, FcVoicePresentation } from "react-icons/fc";


export default function AdminHome() {
    const loggedInUser = useContext(AuthContext);
    const {role} = loggedInUser;

    const ServiceManagement = () => {
        return (
            <React.Fragment>
                <div className="bg-gray-100">
                <br />
                    <p className="ml-10 font-sans text-2xl font-semibold opacity-75">System Management</p>
                    <div className="border-b-2 border-gray-900 mt-6 opacity-25 ml-10"></div>
                    <br />
                    <div className="hover:scale-110 transition duration-300 ease-in-out ml-10 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10 mt-10">
                            <FcServices className="mb-3 w-24 h-24"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-500 dark:text-white font-semibold">Manage Users</h5>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="/users" target="_blank" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-400">Go</a>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>

                <div className="bg-gray-100">
                    <p className="ml-10 font-sans text-2xl font-semibold opacity-75">Reports Management</p>
                    <div className="border-b-2 border-gray-900 mt-6 opacity-25 ml-10"></div>
                    <br />
                    <div className="flex flex-col md:flex-row space-x-10 px-10">
                        <div className="hover:scale-110 transition duration-300 ease-in-out w-64 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <FcVoicePresentation className="mb-3 w-24 h-24"/>
                                <h5 className="mb-1 text-xl font-medium text-gray-500 dark:text-white font-semibold">Users Report</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/users-report" target="_blank" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600">Go</a>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-110 transition duration-300 ease-in-out w-64 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <FcPositiveDynamic className="mb-3 w-24 h-24"/>
                                <h5 className="mb-1 text-xl font-medium text-gray-500 dark:text-white font-semibold">Order Report</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/order-report" target="_blank" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600">Go</a>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-110 transition duration-300 ease-in-out w-64 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <FcPaid className="mb-3 w-24 h-24"/>
                                <h5 className="mb-1 text-xl font-medium text-gray-500 dark:text-white font-semibold">Items Report</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/items-report" target="_blank" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600">Go</a>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-110 transition duration-300 ease-in-out w-64 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <FcTodoList className="mb-3 w-24 h-24"/>
                                <h5 className="mb-1 text-xl font-medium text-gray-500 dark:text-white font-semibold">Questions Report</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/questions-report" target="_blank" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
        {role === 'ADMIN' ? 
            <React.Fragment>
                <NavBar />
                <ServiceManagement />
            </React.Fragment>
            :
            <Error404 />
        }
        </React.Fragment>
    );

}