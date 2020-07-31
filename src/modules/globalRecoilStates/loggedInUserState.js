import {atom} from "recoil";
import {useRecoilState} from "recoil/dist";
import {recoilKeys} from "../constants";
import UserData from "../classes/UserData";
import {authApi} from "../api";


const loggedInUserState = atom({
    key: recoilKeys.LOGGED_IN_USER_STATE,
    default: undefined,
});


function setValue(newValue, setState) {
    if (newValue === undefined || !newValue instanceof UserData)
        throw new Error("new value must be of type MessageData")
    setState(newValue)
}

export default function useState() {
    const [getState, setState] = useRecoilState(loggedInUserState)


    function isLoggedIn() {
        return getState !== undefined && getState instanceof UserData
    }
    function checkAndUpdateUserState() {
        (async ()=>{
            const data = await authApi.getCurrentUser()
            console.log(data)
            if(!data  && getState )
               return  setState(undefined)
            if(data && !getState)
                return  setState(new UserData(data))
            if(data && getState)
                if(data.id !== getState.id)
                return  setState(new UserData(data))
        })()
    }


    return [{user:getState,isLoggedIn, checkAndUpdateUserState}, (newValue) => setValue(newValue, setState)]
}

