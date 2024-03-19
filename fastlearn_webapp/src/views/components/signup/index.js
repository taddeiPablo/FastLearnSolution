import { useState } from "react";
//import { useSignupLoginQuery } from '../../../redux/api/fast_users_api';

export default function Signup(props){
    const { type } = props;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    /*const [ StudentSignup, TeacherSignup, 
        {data: response, isLoading, isSuccess, isFetching, error }] = useSignupLoginQuery();*/

    const handleEmailInput = ({ target: { value }}) => {
        setemail(value);
    };
    const handlePasswordInput = ({ target: { value }}) => {
        setpassword(value);
    };

    const signup = (event) =>{
        event.preventDefault();
        if(type.contains("student")){
            // aqui realizar la query hacia la api como estudiante
            //StudentSignup(email, password);
        }else if(type.contains("teacher")){
            // aqui realizar la query hacia la api como profesor
            //TeacherSignup(email, password);
        }
        /*console.log(response);
        console.log(isLoading);
        console.log(isSuccess);
        console.log(isFetching);
        console.log(error);*/
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
                    <button>registrarse</button>
                </form>
            </div>
        </>
    );
};