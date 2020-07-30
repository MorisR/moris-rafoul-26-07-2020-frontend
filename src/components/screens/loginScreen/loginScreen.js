import React from 'react';

import LoginForm from "../../general/loginForm/loginForm";
import {authApi} from "../../../modules/api";
import {loggedInUserState, popupMessageState} from "../../../modules/globalRecoilStates";
import UserData from "../../../modules/classes/UserData";



function LoginScreen({onLogin}) {
    const [, setLoggedInUser] = loggedInUserState()
    const [, setPopupMessage] = popupMessageState()


    function loginFormSubmitHandler({email, password} = {}, lockForm) {

        (async () => {
            lockForm(true)
            const {ok, message, user} = await authApi.login(email, password)
            if (!ok) {
                setPopupMessage({error:message})
                lockForm(false)
                return;
            }
            setLoggedInUser(new UserData(user))
            if (message)
                setPopupMessage({success:message})
            onLogin && onLogin({email,password})


        })()


    }

    return <div className="flexCenter flexDirectionColumn fullScreenHeight">
            <LoginForm onSubmit={loginFormSubmitHandler}/>
    </div>
}

export default LoginScreen;