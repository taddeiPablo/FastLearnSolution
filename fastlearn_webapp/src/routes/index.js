import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from '../views/main';
import Student from '../views/student';
import Teacher from '../views/teacher';

function Routers(){
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/teacher" element={<Teacher />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Routers;