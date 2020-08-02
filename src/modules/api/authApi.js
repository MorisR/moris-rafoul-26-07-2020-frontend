import axios from "axios"
import UserData from "../classes/UserData";
const backendRoute = process.env.REACT_APP_BACKEND_API_HOST
export async function login(email, password) {
    let returnVal;
    const response = await axios.post(`${backendRoute}/auth/login`, {email, password})
    returnVal = response.data || {};
    if (response.data.ok)
        returnVal.user =  await getCurrentUser()


    return returnVal;
}

export async function logout() {

    const response = await axios.get(`${backendRoute}/auth/logout`,{withCredentials: true})
    return response.data;
}

export async function register({email, password, firstName, lastName}) {

    const response = await axios.post(`${backendRoute}/auth/register`, {email, password, firstName, lastName},{withCredentials: true})
    return response.data;
}

export async function getCurrentUser() {

    const response = await axios.get(`${backendRoute}/auth/currentUser`,{withCredentials: true})
    return response.data.data;
}

export function rawToClass(raw) {
    return new UserData(raw);
}
