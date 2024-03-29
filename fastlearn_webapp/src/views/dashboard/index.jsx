import { useState, useEffect } from "react";
import  UserStore  from '../../store/UserStore';
import Profile from '../../store/ProfileStore';

export default function Dashboard(){
    const token = UserStore.getState().token;
    const pathUsr = UserStore.getState().pathUser;
    console.log(pathUsr);
    const {fetchUserData, fetchProfileData, fetchUser, fetchprofile, loading, fetching, error, success } = Profile();
    const handleCall = async() => {
        const resp = await fetchUserData(token, pathUsr);
        console.log("ingreso aqui");
        console.log(resp);
        console.log("evaluamos la variable tipo userData");
        console.log(fetchUser?.success.email);
        console.log(loading);
        console.log(fetching);
        console.log(error);
        console.log(success);
        console.log("-----------------------------------------");
        console.log("datos del perfil del usuario");
        const resp1 = await fetchProfileData(token);
        console.log(fetchprofile);
        console.log(loading);
        console.log(fetching);
        console.log(error);
        console.log(success);

    }
    useEffect(() => {
        handleCall();
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