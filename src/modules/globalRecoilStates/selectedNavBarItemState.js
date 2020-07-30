import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import NavBarItem from "../classes/NavBarItem";


const selectedMessageState = atom({
    key: recoilKeys.SELECTED_NAV_BAR_ITEM,
    default: {},
});


function setValue  (newValue,setState ){
    if(newValue === undefined || newValue instanceof NavBarItem )
        throw new Error("new value must be of type NavBarItem")
    setState(newValue)
}

export default function useState() {
   const [getState,setState] = useRecoilState(selectedMessageState)
    return [getState, (newValue)=>setValue(newValue,setState)]
}