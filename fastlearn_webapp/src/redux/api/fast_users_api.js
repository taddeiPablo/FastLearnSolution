import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('X_auth_token');
};


// aqui continuar con este video : https://www.youtube.com/watch?v=Icd-_K7KFrs
// https://www.youtube.com/watch?v=A8gd1EWOCyA

const BASE_URL = "http://localhost:3000/api/users";

export const Fastlearn_users_Api = createApi({
    reducePath: 'Fastlearn_users_Api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: BASE_URL
        }
    ),
    tagTypes: ["Post"],
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
        StudentLogin: builder.mutation({
            query: (body) => ({
                    url: '/student/login',
                    method: 'POST',
                    body: {"email": "tito@tito.com", "password": "123456"}, //JSON.stringify(body), //{"email": body.email, "password": body.password},
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-type": "application-json; charset=UTF-8"
                    }
            }),
            invalidatesTags: ["Post"],
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
        TeacherLogin: builder.mutation({
            query: (email, password) => ({
                return: {
                    url: '/teacher/login',
                    method: 'POST',
                    body:{
                        "email": email,
                        "password": password
                    },
                    headers: {
                        "Content-type": "application-json"
                    }
                },
            })
        })
    })
});

export const { useStudentLoginMutation } = Fastlearn_users_Api;