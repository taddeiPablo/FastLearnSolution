
import { useState } from "react";
import { useStudentLoginQuery, useTeacherLoginQuery } from '../../../redux/api/fast_users_api';

export default function Login(props){
    const { type } = props;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleInputEmail = ({ target: { value }}) =>{
        setemail(value);
    };
    const handleInputPassword = ({ target: { value }}) => {
        setpassword(value);
    };

    const Signin = () => {
        if(type.contains("student")){
            // aqui realizar la query hacia la api como estudiante
        }else if(type.contains("teacher")){
            // aqui realizar la query hacia la api como profesor
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
                    <button>ingresar</button>
                </form>
            </div>
        </>
    );
};