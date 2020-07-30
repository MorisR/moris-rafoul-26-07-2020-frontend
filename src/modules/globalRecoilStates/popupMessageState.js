import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import UserData from "../classes/UserData";


const popupMessageState = atom({
    key: recoilKeys.POPUP_MESSAGE_STATE,
    default: {},
});


export default function useState() {
    return  useRecoilState(popupMessageState)
}