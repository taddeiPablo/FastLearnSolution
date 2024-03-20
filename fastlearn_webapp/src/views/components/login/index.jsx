import { useState, useEffect } from "react";

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

    const login = async (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div>
                <form>
                    <h4>Login</h4>
                    <label>
                        <input type="text" name="email" value={email} onChange={handleInputEmail}/>
                    </label>
                    <label>
                        <input type="password" name="password" value={password} onChange={handleInputPassword}/>
                    </label>
                    <button onClick={login}>ingresar</button>
                </form>
            </div>
        </>
    )
}