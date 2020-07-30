import axios from "axios"

export async function login(email, password) {
    let returnVal;
    const response = await axios.post("/api/auth/login", {email, password})
    returnVal = response.data || {};
    if (response.data.ok)
    {
        const userData = await getCurrentUser()
        returnVal.user = userData.data
    }

    return returnVal;
}

export async function logout(email, password) {

    const response = await axios.get("/api/auth/logout")
    return response.data;
}

export async function register({email, password, firstName, lastName}) {

    const response = await axios.post("/api/auth/register", {email, password, firstName, lastName})
    return response.data;
}

export async function getCurrentUser() {

    const response = await axios.get("/api/auth/currentUser")
    return response.data;
}
