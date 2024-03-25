import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from '../views/main';
import Student from '../views/student';
import Teacher from '../views/teacher';
import Dashboard from "../views/dashboard";

function Routers(){
    return(
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/teacher" element={<Teacher />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routers;