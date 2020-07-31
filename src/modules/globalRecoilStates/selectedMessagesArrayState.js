import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import MessageData from "../classes/MessageData";


const selectedMessagesArrayState = atom({
    key: recoilKeys.SELECTED_MESSAGE_ARRAY_STATE,
    default: [],
});


function setValue(newValue, setState) {
    if (!Array.isArray(newValue) || newValue.any(data => !data instanceof MessageData))
        throw new Error("new value must be an array of MessageData")
    setState(newValue)
}

export default function useState() {
    const [getState, setState] = useRecoilState(selectedMessagesArrayState)
    return [getState, (newValue) => setValue(newValue, setState)]
}