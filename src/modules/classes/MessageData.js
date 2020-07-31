import UserData from "./UserData";
import moment from "moment";

export default class MessageData {
    #id
    #title
    #content
    #sender
    #receiver
    #creationDate

    constructor({title, content = "", sender, receiver,creationDate}) {

        if (!sender instanceof UserData)
            throw new Error("sender must be of type UserData")

        if (!receiver instanceof UserData)
            throw new Error("sender must be of type UserData")

        if (typeof content !== "string")
            throw new Error("content must be of type string")

        if (typeof title !== "string")
            throw new Error("title must be of type string")
        if (!creationDate instanceof Date)
            throw new Error("creationDate must be of type Date")

        this.#title = title;
        this.#content = content;
        this.#sender = sender;
        this.#receiver = receiver;
        this.#creationDate = creationDate
    }

    get title() {
        return this.#title
    }
    get content() {
        return this.#content
    }
    get sender() {
        return this.#sender
    }
    get receiver() {
        return this.#receiver
    }
    get creationDate() {
        return this.#creationDate
    }
    get id() {
        return this.#id;
    }

    get creationDateFromNow() {
        return moment(this.#creationDate).fromNow()
    }
}


