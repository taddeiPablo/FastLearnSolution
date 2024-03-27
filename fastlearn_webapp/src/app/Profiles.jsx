import apicall from './api';

export const getProfile = async (token) => {
    try {
        let headers = { headers:{'Authorization': `bearer ${token}`}};
        const response = await apicall.get('/profiles/profile', headers );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createProfile = async(token, profileObj) => {
    try {
        let headers = { headers:{'Authorization': `bearer ${token}`}}
        const response = await apicall.post('/profiles/create', profileObj, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/*export const updateProfile = async(token, profileObj) => {
    try {
        let headers = { headers:{'Authorization': `bearer ${token}`}}
        //const response = await apicall.post('/profiles/update', )
    } catch (error) {
        console.log(error);
    }
}*/