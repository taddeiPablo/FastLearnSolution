import { useState } from "react";
import { signup } from '../../../app/Signup_and_Login';

import '../../components/style/layout.css';

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
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            signup(path, email, password)
            .then(function(data){
                // data.success (mensaje de usuarios creado correctamente)
                console.log(data.success);
            })
            .catch(function(error){
                // aqui error
                console.log(error);
            });   
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <> 
            <div className="container">
                <form>
                    <h4>Registro</h4>
                    <label>
                        <input type="text" name="email" value={email} onChange={handleEmailInput}/>
                    </label>
                    <br />
                    <label>
                        <input type="password" name="password" value={password} onChange={handlePasswordInput}/>
                    </label>
                    <br />
                    <button onClick={ handleSignup }>registrarse</button>
                </form>
            </div>
        </>
    )
}