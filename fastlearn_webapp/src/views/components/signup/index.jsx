import { useState } from "react";

export default function Signup(props){
    const { path } = props;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleEmailInput = ({ target: { value }}) => {
        setemail(value);
    }
    const handlePasswordInput = ({ target: { value }}) => {
        setpassword(value);
    }
    const signup = (event) =>{
        event.preventDefault();
    };

    return (
        <> 
            <div>
                <form>
                    <h4>Registro</h4>
                    <label>
                        <input type="text" name="email" value={email} onChange={handleEmailInput}/>
                    </label>
                    <label>
                        <input type="password" name="password" value={password} onChange={handlePasswordInput}/>
                    </label>
                    <button onClick={signup}>registrarse</button>
                </form>
            </div>
        </>
    )
}