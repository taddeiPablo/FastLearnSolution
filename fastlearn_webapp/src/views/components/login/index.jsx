import { useState, useEffect } from "react";
import { login } from '../../../app/Signup_and_Login';

import '../../components/style/layout.css';

export default function Login(props) {
    const { path } = props;
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
        login(path, email, password)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
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