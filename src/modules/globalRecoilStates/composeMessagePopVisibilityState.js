import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";


const composeMessagePopVisibilityState = atom({
    key: recoilKeys.POPUP_SEND_MESSAGE_STATE,
    default:false,
});


export default function useState() {
    return  useRecoilState(composeMessagePopVisibilityState)
}