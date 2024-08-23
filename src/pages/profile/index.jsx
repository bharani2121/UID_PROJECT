import React, { useContext, useEffect } from "react"
import { findUsers } from "../../api/User/userApi";
import { AuthContext } from "../../App"
import Dialog from "../../components/dialog/Dialog";
import NavBar from "../../components/LayoutComponents/NavBar";
import Editprofile from "../../components/Profile/EditProfile";
import ProfileSideNav from "../../components/Profile/ProfileSideNav";
import { FcAssistant, FcSms, FcContacts, FcSettings, FcShipped, FcSynchronize } from "react-icons/fc";

export default function Profile() {
    const loggedInUser = useContext(AuthContext);
    const {userId} = loggedInUser;
    const [user, setUser] = React.useState([]);
    const [editModelOpen, setEditModelOpen] = React.useState(false);

    useEffect(() => {
        getUser();
    }, [userId]);
    
    const getUser = () => {
        findUsers(`id=${userId}`)
          .then(res => {
            if(res.data.isSuccessful) {
                let userData = res.data.responseData;
                for (let valueObj = 0; valueObj < userData?.length; valueObj++) {
                    if (userData[valueObj]._id === userId) {
                        console.log(userData[valueObj]);
                        setUser(userData[valueObj]);
                    }
                }
            } else {
                console.error("error");
            }
          })
          .catch(() => console.log("couldn't fetch"));
    }

    const ProfileDetails = () => {
        const getUserAddressDetailStr = () => {
        let userAddress = (user.address1 ? user.address1 + ",\n" : "-") + (user.address2 ? user.address2 + ",\n" : "") + (user.city ? user.city + ",\n" : "");
        return userAddress && userAddress.length > 1 ? userAddress.substring(0, userAddress.length - 1) : userAddress;
       
    };

    const setEditingUser = (payload) => {
        setUser(payload);
        setEditModelOpen(true);
    }

    return (
        <div className="ml-52 md:ml-64 mt-5">
            <div className="flex flex-col md:flex-row">
                <img src={user.pic} className="rounded-full w-20 h-20 shadow-lg" alt="Avatar" />
                <div>
                    <p className="mt-7 ml-0 md:ml-8">{(user.firstName + " " + user.lastName) + " " + "("+ user.username + ")"}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <p className="mt-6 italic w-max">User Information</p>
                <button className="ml-0 md:ml-96" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" onClick={() => setEditingUser(user)}>
                    <img src="images/edit.jpg" className="rounded-full w-8 h-8 shadow-lg" alt="Edit" user={user}/>
                </button>
            </div>
            
            <div className="border-b-4"></div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-40 mt-2 md:mt-0">
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300"><FcAssistant /></span>
                </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80">
                        <div className="text-base font-bold text-gray-600">Full Name</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{(user.firstName + " " + user.lastName)}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"><FcSms /></span>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80">
                        <div className="text-base font-bold text-gray-600">Email Address</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{user.email}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
                
            </div>

            <div className="flex flex-col md:flex-row space-x-0 md:space-x-40 mt-2 md:mt-0">
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"><FcContacts /></span>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80">
                        <div className="text-base font-bold text-gray-600">Contact No</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{user.contactNo? user.contactNo : "-"}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"><FcSettings /></span>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80">
                        <div className="text-base font-bold text-gray-600">Profile Role</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{user.role}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
            </div>

            <div className="flex flex-col md:flex-row space-x-0 md:space-x-40 mt-2 md:mt-0">
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"><FcShipped /></span>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80 ">
                        <div className="text-base font-bold text-gray-600">Address</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{getUserAddressDetailStr()}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
                <figcaption className="flex justify-center items-center space-x-3 mt-5 md:mt-10 basis-1/2">
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300"><FcSynchronize /></span>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left w-80">
                        <div className="text-base font-bold text-gray-600">Province/State</div>
                        <div className="text-sm font-light text-gray-400 dark:text-gray-400">{user.state? user.state : "-"}</div>
                        <div className="border-b-2 border-gray-300"></div>
                    </div>
                </figcaption>
            </div>
        </div>
    );
    }

    return (
        <>
            <NavBar />
            <div className="">
                <ProfileSideNav />
                <br />
                <ProfileDetails />
                {editModelOpen &&
                    <Dialog onClose={() => setEditModelOpen(false)}>
                        <Editprofile userDetails={user} handleGetUser={getUser} setEditModelOpen={setEditModelOpen}/>
                    </Dialog>
                }
                <br />
                <br />
            </div>
        </>
    );
}