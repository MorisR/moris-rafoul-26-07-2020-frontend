import {UserData} from "./UserData";

export default class MessageData {
    #title
    #content
    #sender
    #receiver

    constructor({title, content = "", sender, receiver}) {

        if (!sender instanceof UserData)
            throw new Error("sender must be of type UserData")

        if (!receiver instanceof UserData)
            throw new Error("sender must be of type UserData")

        if (typeof content !== "string")
            throw new Error("content must be of type string")

        if (typeof title !== "string")
            throw new Error("title must be of type string")

        this.title = title;
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;

    }

    get title() {
        return this.title
    }

    get content() {
        return this.content
    }

    get sender() {
        return this.sender
    }

    get receiver() {
        return this.receiver
    }


}


