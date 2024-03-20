import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Login from '../components/login';
import Signup from '../components/signup';

export default function Teacher(){
    const { pathname } = useLocation();

    const onclickLogin = () => {
        console.log(pathname);
    };
    const onclickSignup = () => {
        console.log(pathname);
    };

    return (
        <>
            <div>AQUI VIEW DE TEACHER</div>
            <h6>aqui armar el toggle cuando comencemos la parte de diseño</h6>
            <button onClick={onclickLogin}>login ....</button>
            <Login type={pathname}/>
            <button onClick={onclickSignup}>signup .....</button>
            <Signup type={pathname}/>
        </>
    )
}