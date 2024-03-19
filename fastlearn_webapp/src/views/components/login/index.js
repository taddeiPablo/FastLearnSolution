
import { useState, useEffect } from "react";
import { useStudentLoginMutation } from "../../../redux/api/fast_users_api";

export default function Login(props){
    const { type } = props;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    const [
            StudentLogin, 
            {
                data: dataLogin, 
                isSuccess: isLoginSuccess,
                isError: isLoginError,
                error: loginError
            },
        ] = useStudentLoginMutation();

    const handleInputEmail = ({ target: { value }}) =>{
        setemail(value);
    };
    const handleInputPassword = ({ target: { value }}) => {
        setpassword(value);
    };

    useEffect(() => {
        if(isLoginSuccess){
            console.log("funcion");
            console.log(dataLogin);
        }
    }, [isLoginSuccess]);

    const login = async (event) => {
        event.preventDefault();
        if(type.includes("student")){
            console.log("student");
            let body = {"email": email, "password": password};
            await StudentLogin(body);
        }else if(type.includes("teacher")){
            console.log("teacher");
        }
    };

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
    );
};