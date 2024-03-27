import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

import Main from '../views/main';
import Student from '../views/student';
import Teacher from '../views/teacher';
import Dashboard from "../views/dashboard";

// <Route path="/dashboard" element={<Dashboard />} />

function Routers(){
    return(
        <div className="App">
            <BrowserRouter>
                <Routes> 
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Dashboard />} path="/Dashboard" exact />
                    </Route>
                    <Route path="/" element={<Main />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/teacher" element={<Teacher />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routers;