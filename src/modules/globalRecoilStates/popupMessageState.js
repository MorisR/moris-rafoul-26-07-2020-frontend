import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";


const popupMessageState = atom({
    key: recoilKeys.POPUP_MESSAGE_STATE,
    default: {},
});


export default function useState() {
    return  useRecoilState(popupMessageState)
}