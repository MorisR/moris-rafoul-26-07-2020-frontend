import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import MessageData from "../classes/MessageData";


const selectedMessageState = atom({
    key: recoilKeys.SELECTED_MESSAGE_STATE,
    default: undefined,
});


function setValue  (newValue,setState ){
    if(newValue === undefined || !newValue instanceof MessageData )
        throw new Error("new value must be of type MessageData")
    setState(newValue)
}

export default function useState() {
   const [getState,setState] = useRecoilState(selectedMessageState)
    return [getState, (newValue)=>setValue(newValue,setState)]
}