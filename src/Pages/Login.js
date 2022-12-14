import React, { useContext } from 'react';
import bg from '../Images/bg.png';
import {FcGoogle} from 'react-icons/fc'
import { AuthContext } from '../context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
    const {googleSignIn}=useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleGoogle = () => {
        googleSignIn(googleProvider)
        .then(result=>{
            const user = result.user;
            navigate(from, { replace: true });
            toast.success('Login Successfully.');
        })
        
        .catch(err => console.error(err));
    }

    
                
    
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex justify-center items-center lg:flex-row flex-col'>
                <div>
                    <img className='lg:w-3/4 mx-auto' src={bg} alt="" />
                </div>
                <div className='w-full text-center'>
                    <h1 className='text-5xl mb-5'>Login with Google</h1>
                    <button className='btn btn-outline btn-primary text-2xl flex items-center px-3 py-1 mx-auto  ' onClick={() => handleGoogle()} >
                   <FcGoogle className=' w-10 h-10 ' />Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;