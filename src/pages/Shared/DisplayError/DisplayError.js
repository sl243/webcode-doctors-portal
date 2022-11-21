import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(() => { })
    }

    return (
        <div className='text-center mt-48'>
            <p className='text-red-500 text-xl'>Someting Went wrong!!!</p>
            <p className='text-red-500 text-xl'>{error.statusText || error.message} 404</p>
            <h4 className='text-xl'> 
                <button><Link onClick={handleLogOut} > Sign Out</Link></button>
            </h4>
        </div>
    );
};

export default DisplayError;