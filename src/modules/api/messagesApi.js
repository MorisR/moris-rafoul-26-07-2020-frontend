import axios from "axios"
import moment from "moment"
import MessageData from "../classes/MessageData";
import {authApi} from "./index";
axios.defaults.withCredentials = true
const backendRoute = process.env.REACT_APP_BACKEND_API_HOST


export async function getMessage(messageId) {
    const {data: response} = await axios.get(`${backendRoute}/messages/${messageId}`,{withCredentials:true})
    return response.data;
}
export async function getReceived() {
    const {data: response} = await axios.get(`${backendRoute}/messages/received`,{withCredentials:true})
    if (response.ok)
        return response.data;
    return [];

}
export async function getSent() {
    const {data: response} = await axios.get(`${backendRoute}/messages/sent`,{withCredentials:true})
    if (response.ok)
        return response.data;
    return [];
}
export async function getTrash() {
    const {data: response} = await axios.get(`${backendRoute}/messages/trash`,{withCredentials:true})
    if (response.ok)
        return response.data;

}

export async function sendMessage({email:recipientEmail, subject, content:message}) {
    const {data: response} = await axios.post(`${backendRoute}/messages`, {recipientEmail, subject, message})
    return response;
}
export async function setReadState(messageId,isRead) {
    const {data: response} = await axios.post(`${backendRoute}/messages/markAsRead/${messageId}/${Boolean(isRead)}`)
    return response;
}
export async function setTrashState(messageId,isTrash) {
    const {data: response} = await axios.post(`${backendRoute}/messages/trash/${messageId}/${Boolean(isTrash)}`)
    return response;

}




export function rawArrayToClassesArray(arr = []) {
    return arr.map(x => rawToClass(x))
}

export function rawToClass(element = []) {
    element.receiver =authApi.rawToClass(element.receiver)
    element.sender = authApi.rawToClass(element.sender)
    element.content = element.message;
    element.title = element.subject;
    element.isRead = element.messageSettings?.read;
    element.inTrash = element.messageSettings?.inTrash;
    element.creationDate = moment(element.creationDate).toDate()
    return new MessageData(element)

}