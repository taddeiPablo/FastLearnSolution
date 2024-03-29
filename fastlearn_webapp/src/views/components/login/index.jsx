import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { login } from '../../../app/Signup_and_Login';
import  UserStore  from '../../../store/UserStore';

import '../../components/style/layout.css';

export default function Login(props) {
    const { path } = props;
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    const handleInputEmail = ({ target: { value }}) =>{
        setemail(value);
    }
    const handleInputPassword = ({ target: { value }}) => {
        setpassword(value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            login(path, email, password)
            .then(function(data){
                UserStore.getState().setAuth(true);
                UserStore.getState().setToken(data.success);
                UserStore.getState().setPathUser(path);
                navigate('/Dashboard');
            })
            .catch(function(error){
                console.log(error);
            });   
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
                <form>
                    <h4>Login</h4>
                    <label>
                        <input type="text" name="email" value={email} onChange={handleInputEmail}/>
                    </label>
                    <br/>
                    <label>
                        <input type="password" name="password" value={password} onChange={handleInputPassword}/>
                    </label>
                    <br />
                    <button onClick={ handleLogin }>ingresar</button>
                </form>
            </div>
        </>
    )
}