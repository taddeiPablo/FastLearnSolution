import { useState, useEffect } from "react";
import  UserStore  from '../../store/UserStore';
import Profile from '../../store/ProfileStore';

export default function Dashboard(){
    const token = UserStore.getState().token;
    const pathUsr = UserStore.getState().pathUser;
    console.log(pathUsr);
    const {fetchUserData, fetchProfileData, fetchUser, fetchprofile, loading, fetching, error, success } = Profile();
    let index = 0;
    const handleCall = async() => {
        console.log(index++);
        const resp = await fetchUserData(token, pathUsr);
        console.log("ingreso aqui");
        console.log(resp);
        console.log("evaluamos la variable tipo userData");
        console.log(fetchUser);
        
        console.log(success);
        console.log("-----------------------------------------");
        console.log("datos del perfil del usuario");
        const resp1 = await fetchProfileData(token);
        console.log(fetchprofile);
        console.log(success);

    }
    useEffect(() => {
        if(!success){
            handleCall();
        }
    },[]);
    /**
     *  <h1>AQUI DATO DEL USER</h1>
            <div>{userData}</div>
            <hr></hr>
            <h1>AQUI DATOS DE PERFIL</h1>
            <div>{profile}</div>
     */
    return(
        <>
            <h1>AQUI TOKEN</h1>
            <div>{token}</div>
            <hr></hr>
           
        </>
    )
}