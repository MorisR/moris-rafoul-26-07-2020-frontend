import axios from "axios"
import UserData from "../classes/UserData";
import url from 'url'
const backendRoute = process.env.REACT_APP_BACKEND_API_HOST





export async function login(email, password) {
    let returnVal;
    const apiUrl = url.resolve(backendRoute,`/auth/login`)
    const response = await axios.post(apiUrl, {email, password},{withCredentials:true})
    returnVal = response.data || {};
    if (response.data.ok)
        returnVal.user =  await getCurrentUser()


    return returnVal;
}

export async function logout() {

    const apiUrl = url.resolve(backendRoute,`/auth/logout`)
    const response = await axios.get(apiUrl,{withCredentials:true})
    return response.data;
}

export async function register({email, password, firstName, lastName}) {
    const apiUrl = url.resolve(backendRoute,`/auth/register`)
    const response = await axios.post(apiUrl, {email, password, firstName, lastName},{withCredentials:true})
    return response.data;
}

export async function getCurrentUser() {
    const apiUrl = url.resolve(backendRoute,`/auth/currentUser`)
    const response = await axios.get(apiUrl,{withCredentials:true})
    return response.data.data;
}

export function rawToClass(raw) {
    return new UserData(raw);
}
