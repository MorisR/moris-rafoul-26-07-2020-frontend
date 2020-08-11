import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {navBarItemsNames, recoilKeys} from "../constants";
import MessageData from "../classes/MessageData";
import {messagesApi} from "../api";


const selectedMessagesArrayState = atom({
    key: recoilKeys.SELECTED_MESSAGE_ARRAY_STATE,
    default: [],
});


function setValue(newValue = [], setState) {
    if (!Array.isArray(newValue) || newValue.some(data => !data instanceof MessageData))
        throw new Error("new value must be an array of MessageData")
    setState(newValue)
}

async function updateArray(fetchGroup, setState) {

    switch (fetchGroup) {
        case navBarItemsNames.INBOX:
            const receivedMessagesData = await messagesApi.getReceived()
            return setState(messagesApi.rawArrayToClassesArray(receivedMessagesData))

        case navBarItemsNames.TRASH:
            const trashMessagesData = await messagesApi.getTrash()
            return setState(messagesApi.rawArrayToClassesArray(trashMessagesData))

        case navBarItemsNames.SENT:
            const sentMessagesData = await messagesApi.getSent()
            return setState(messagesApi.rawArrayToClassesArray(sentMessagesData))

        default:
            throw new Error("incorrect type was provided")

    }
}

export default function useState() {
    const [getState, setState] = useRecoilState(selectedMessagesArrayState)


    return [{
        data: getState,
        updateArray: (fetchGroup) => updateArray(fetchGroup, setState)
    },
        (newValue) => setValue(newValue, setState)]
}