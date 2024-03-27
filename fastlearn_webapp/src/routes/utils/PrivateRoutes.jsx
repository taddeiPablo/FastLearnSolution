//import { Route, Redirect } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import UserStore from '../../store/UserStore';

const PrivateRoutes = () => {
    let auth = {'token':false};
    auth.token = UserStore.getState().auth;
    return auth.token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes;