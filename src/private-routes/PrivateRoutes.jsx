import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../App';
import { 
    getAuth,
    getLoggedUserProfilePic,
    getLoggedUserRole
} from '../helper/helper';

export default function PrivateRoutes() {
    const userId = getAuth()._id;
    const role = getLoggedUserRole();
    const proPic = getLoggedUserProfilePic();

    const loggedInUser = {
        userId,
        role,
        proPic
    }
    // When you provide loggedInUser object to AuthContext like below, Other child components will be able to get loggedInUser
    return (
        <AuthContext.Provider value={loggedInUser}>
            {userId ? <Outlet  /> : <Navigate to="/login" />}
        </AuthContext.Provider>
    )
}