import axios from "axios"
import UserData from "../classes/UserData";
import MessageData from "../classes/MessageData";

export async function getReceived() {
    const {data:response} = await axios.get("/api/messages/received")
    if (response.ok)
        return response.data;
    return  [];

}

export async function getSent() {
    const {data:response} = await axios.get("/api/messages/sent")
    if (response.ok)
        return response.data;
    return  [];
}

export async function getTrash() {
    const {data:response} = await axios.get("/api/messages/trash")
    if (response.ok)
        return response.data;

}

export function rawToClass(arr = []) {
    return arr.map(x=> {
        x.receiver = new UserData(x.receiver)
        x.sender = new UserData(x.sender)
        x.content = x.message
        x.title = x.subject
        return new MessageData(x)
    })
}