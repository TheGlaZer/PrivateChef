import server from ".";

export const loginAPI = async (values: { email: string, password: string }) => {
    const response = await server.post('/users/login', values);
    return response.data;
}

export const registerAPI = async (formData: FormData) => {
    const response = await server.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
    return response.data;
}

export const updateProfileAPI = async (formData: FormData) => {
    const response = await server.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
    return response.data;
}

export const googleLoginAPI = async (values: any) => {
    const response = await server.post('/users/login-google', values);
    return response.data;
}

export const googleRegisterAPI = async (values: { tokenId: string }) => {
    const response = await server.post('/users/googleRegister', values);
    return response.data;
}