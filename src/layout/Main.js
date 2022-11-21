import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Nabber from '../pages/Shared/Nabber/Nabber';

const Main = () => {
    return (
        <div>
            <Nabber></Nabber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;