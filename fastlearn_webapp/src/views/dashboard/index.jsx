import { useState } from "react";
import  UserStore  from '../../store/UserStore';

export default function Dashboard(){
    const token = UserStore.getState().token;
    return(
        <>
            <h1>AQUI TOKEN</h1>
            <div>{token}</div>
            <div>aqui pantalla principal !!!!</div>
            <hr></hr>
            <div>AQUI ALGUNAS FUNCIONES QUE DEBE TENER LA APP</div>
            <div>MENU</div>
            <a href="">CargarPerficl</a>
        </>
    )
}