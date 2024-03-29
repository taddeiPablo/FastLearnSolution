import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/navigation';

import Login from '../components/login';
import Signup from '../components/signup';

export default function Student(){
    const { pathname } = useLocation();
    return (
        <>
            <Nav actionMenu={false}/>
            <div>AQUI VIEW DE STUDENTS</div>
            <h6>aqui armar el toggle cuando comencemos la parte de diseño</h6>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <h5> *** SIGNUP ***</h5>
                    <Signup path={pathname}/>
                </div>
                <div className='col-span-1 bg-purple-600 bg-opacity-100'>
                    <h5> *** LOGIN *** </h5>
                    <Login path={pathname}/>
                </div>
            </div>
        </>
    )
}