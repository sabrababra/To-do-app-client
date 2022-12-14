import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../Pages/Spinner';




const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return <Spinner></Spinner>
    }

    if (user){
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>;
};


export default PrivateRoute;