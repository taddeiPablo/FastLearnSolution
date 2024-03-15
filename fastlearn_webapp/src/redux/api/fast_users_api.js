import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('X_auth_token');
};

const BASE_URL = "http://localhost3000:api/users/";

export const Fastlearn_users_Api = createApi({
    reducePath: 'Fastlearn_users_Api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        StudentSignup: builder.query({
            query: (email, password) => ({
                url: '/student/registration',
                method: 'POST',
                body: {
                    "email": email,
                    "password": password
                },
                headers: {
                    "Content-type": "application-json",
                    "Authorization": `bearer ${ getTokenFromLocalStorage() }`
                }
            })
        }),
        StudentLogin: builder.query({
            query: (email, password) => ({
                url: '/student/login',
                method: 'POST',
                body: {
                    "email": email,
                    "password": password
                },
                headers: {
                    "Content-type": "application-json",
                    "Authorization": `bearer ${ getTokenFromLocalStorage() }`
                }
            })
        }),
        TeacherSignup: builder.query({
            query: (email, password) => ({
                url: '/teacher/registration',
                method: 'POST',
                body:{
                    "email": email,
                    "password": password
                },
                headers: {
                    "Content-type": "application-json",
                    "Authorization": `bearer ${ getTokenFromLocalStorage() }`
                }
            })
        }),
        TeacherLogin: builder.query({
            query: (email, password) => ({
                url: '/teacher/login',
                method: 'POST',
                body:{
                    "email": email,
                    "password": password
                },
                headers: {
                    "Content-type": "application-json",
                    "Authorization": `bearer ${ getTokenFromLocalStorage() }`
                }
            })
        })
    })
});

export const { 
    useStudentSignupQuery, 
    useStudentLoginQuery, 
    useTeacherSignupQuery, 
    useTeacherLoginQuery 
} = Fastlearn_users_Api;