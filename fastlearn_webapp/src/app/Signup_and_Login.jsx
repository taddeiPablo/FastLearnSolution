import apicall from './api';

export const login = async (path, email, password) => {
    try {
        const body = JSON.stringify({email: email, password: password});
        const response = await apicall.post(`/users${path}/login`, body);  
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
}

export const signup = async (path, email, password) => {
    try {
        const body = JSON.stringify({email: email, password: password});
        const response = await apicall.post(`/users${path}/registration`, body);
        return response.data;
    } catch (error) {
        throw new Error('Error');
    }
}