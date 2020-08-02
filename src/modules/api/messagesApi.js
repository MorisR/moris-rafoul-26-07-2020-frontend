import axios from "axios"
import moment from "moment"
import MessageData from "../classes/MessageData";
import {authApi} from "./index";
import url from "url";

axios.defaults.withCredentials = true
const backendRoute = process.env.REACT_APP_BACKEND_API_HOST


export async function getMessage(messageId) {

    const apiUrl = url.resolve(backendRoute, `/messages/${messageId}`)
    const {data: response} = await axios.get(apiUrl, {withCredentials: true})
    return response.data;
}

export async function getReceived() {
    const apiUrl = url.resolve(backendRoute, `/messages/received`)
    const {data: response} = await axios.get(apiUrl, {withCredentials: true})
    if (response.ok)
        return response.data;
    return [];

}

export async function getSent() {
    const apiUrl = url.resolve(backendRoute, `/messages/sent`)
    const {data: response} = await axios.get(apiUrl, {withCredentials: true})
    if (response.ok)
        return response.data;
    return [];
}

export async function getTrash() {
    const apiUrl = url.resolve(backendRoute, `/messages/trash`)
    const {data: response} = await axios.get(apiUrl, {withCredentials: true})
    if (response.ok)
        return response.data;

}

export async function sendMessage({email: recipientEmail, subject, content: message}) {
    const apiUrl = url.resolve(backendRoute, `/messages`)
    const {data: response} = await axios.post(apiUrl, {recipientEmail, subject, message})
    return response;
}

export async function setReadState(messageId, isRead) {
    const apiUrl = url.resolve(backendRoute, `/messages/markAsRead/${messageId}/${Boolean(isRead)}`)
    const {data: response} = await axios.post(apiUrl)
    return response;
}

export async function setTrashState(messageId, isTrash) {
    const apiUrl = url.resolve(backendRoute, `/messages/trash/${messageId}/${Boolean(isTrash)}`)
    const {data: response} = await axios.post(apiUrl)
    return response;

}


export function rawArrayToClassesArray(arr = []) {
    return arr.map(x => rawToClass(x))
}

export function rawToClass(element = []) {
    element.receiver = authApi.rawToClass(element.receiver)
    element.sender = authApi.rawToClass(element.sender)
    element.content = element.message;
    element.title = element.subject;
    element.isRead = element.messageSettings?.read;
    element.inTrash = element.messageSettings?.inTrash;
    element.creationDate = moment(element.creationDate).toDate()
    return new MessageData(element)

}