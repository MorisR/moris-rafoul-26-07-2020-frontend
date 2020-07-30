import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import UserData from "../classes/UserData";


const selectedMessageState = atom({
    key: recoilKeys.LOGGED_IN_USER_STATE,
    default: undefined,
});


function setValue  (newValue,setState ){
    if(newValue === undefined || newValue instanceof UserData )
        throw new Error("new value must be of type MessageData")
    setState(newValue)
}

export default function useState() {
   const [getState,setState] = useRecoilState(selectedMessageState)
    return [getState, (newValue)=>setValue(newValue,setState)]
}