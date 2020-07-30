export default class NavBarItem {
    #icon
    #label
    #newMessagesCount
    #redirectionRoute
    #redirectFunction

    constructor({email, firstName, lastName, id}) {
        if (typeof email !== "string")
            throw new Error("content must be of type string")

        if (typeof firstName !== "string")
            throw new Error("content must be of type string")

        if (typeof lastName !== "string")
            throw new Error("content must be of type string")

        if (typeof id !== "string" || typeof id !== "number")
            throw new Error("content must be of type string or number")

        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

    get icon() {
        return this.icon
    }

    get label() {
        return this.label
    }

    get newMessagesCount() {
        return this.newMessagesCount
    }

    get redirectionRoute() {
        return this.redirectionRoute
    }

    set redirectFunction(redirectionFunction) {
        if (typeof redirectionFunction !== "function")
            throw new Error("redirectionFunction mist be a function")
        this.redirectFunction = redirectionFunction
    }

    redirect() {
        return this.redirectFunction(this.#redirectionRoute)
    }


}