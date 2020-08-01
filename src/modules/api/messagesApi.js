import axios from "axios"
import MessageData from "../classes/MessageData";
import {authApi} from "./index";


export async function getMessage(messageId) {
    const {data: response} = await axios.get(`/api/messages/${messageId}`)
    return response.data;
}
export async function getReceived() {
    const {data: response} = await axios.get("/api/messages/received")
    if (response.ok)
        return response.data;
    return [];

}
export async function getSent() {
    const {data: response} = await axios.get("/api/messages/sent")
    if (response.ok)
        return response.data;
    return [];
}
export async function getTrash() {
    const {data: response} = await axios.get("/api/messages/trash")
    if (response.ok)
        return response.data;

}


export async function sendEmail({email:recipientEmail, subject, content:message}) {
    const {data: response} = await axios.post("/api/messages", {recipientEmail, subject, message})
    return response;
}
export async function setReadState(messageId,isRead) {
    const {data: response} = await axios.post(`/api/messages/markAsRead/${messageId}/${Boolean(isRead)}`)
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
    return new MessageData(element)

}