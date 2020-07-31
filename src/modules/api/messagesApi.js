import axios from "axios"
import UserData from "../classes/UserData";
import MessageData from "../classes/MessageData";


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
    return arr.map(x => {

        x.receiver = new UserData(x.receiver)
        x.sender = new UserData(x.sender)
        x.content = x.message;
        x.title = x.subject;
        x.isRead = x.messageSettings?.read;
        x.inTrash = x.messageSettings?.inTrash;

        return new MessageData(x)
    })
}

export function rawToClass(element = []) {


    element.receiver = new UserData(element.receiver)
    element.sender = new UserData(element.sender)
    element.content = element.message;
    element.title = element.subject;
    element.isRead = element.messageSettings?.read;
    element.inTrash = element.messageSettings?.inTrash;
    return new MessageData(element)

}