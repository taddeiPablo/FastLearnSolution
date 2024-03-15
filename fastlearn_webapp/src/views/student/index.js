import Login from '../components/login';
import Signup from '../components/signup';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Student(){
    //const [typeUser, setTypeUser] = useState("");
    const { pathname } = useLocation();

    const onclickLogin = () => {
        console.log(pathname);
    };
    const onClickSignup = () => {
        console.log(pathname);
    };

    return (
        <>
            <div>AQUI VIEW DE STUDENTS</div>
            <h6>aqui armar el toggle cuando comencemos la parte de diseño</h6>
            <button onClick={onclickLogin}>login ....</button>
            <Login type={pathname}/>
            <button onClick={onClickSignup}>signup .....</button>
            <Signup type={pathname}/>
        </>
    );
};