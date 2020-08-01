import axios from "axios"
import UserData from "../classes/UserData";

export async function login(email, password) {
    let returnVal;
    const response = await axios.post("/api/auth/login", {email, password})
    returnVal = response.data || {};
    if (response.data.ok)
        returnVal.user =  await getCurrentUser()


    return returnVal;
}

export async function logout() {

    const response = await axios.get("/api/auth/logout")
    return response.data;
}

export async function register({email, password, firstName, lastName}) {

    const response = await axios.post("/api/auth/register", {email, password, firstName, lastName})
    return response.data;
}

export async function getCurrentUser() {

    const response = await axios.get("/api/auth/currentUser")
    return response.data.data;
}

export function rawToClass(raw) {
    return new UserData(raw);
}
