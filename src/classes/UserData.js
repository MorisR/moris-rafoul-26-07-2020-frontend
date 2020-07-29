export default class UserData {
    #email
    #firstName
    #lastName
    #id

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

    get email() {
        return this.email
    }

    get firstName() {
        return this.firstName
    }

    get lastName() {
        return this.lastName
    }

    get id() {
        return this.id
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    isCurrentUser(loggedInUserId) {
        return this.id === loggedInUserId;
    }


}


