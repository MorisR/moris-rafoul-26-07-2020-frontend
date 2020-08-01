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
    if (newValue !== undefined && !newValue instanceof UserData)
        throw new Error("new value must be of type UserData")
    setState(newValue)
}

export default function useState() {
    const [getState, setState] = useRecoilState(loggedInUserState)


    function isLoggedIn() {
        return getState !== undefined && getState instanceof UserData
    }

    async function checkAndUpdateUserState() {

        const data = await authApi.getCurrentUser();

        if (!data) {
            setState(undefined);
            return;
        }

        if (getState?.id === data.id)
            return getState;


        const userData = authApi.rawToClass(data)
        setState(userData);

        return userData;
    }


    return [{user: getState, isLoggedIn, checkAndUpdateUserState}, (newValue) => setValue(newValue, setState)]
}

