import React from 'react';

import LoginForm from "../../general/loginForm";
import {authApi} from "../../../modules/api";
import { popupMessageState} from "../../../modules/globalRecoilStates";



function LoginScreen({onLogin}) {
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
            if (message)
                setPopupMessage({success:message})


            onLogin && onLogin(user)


        })()


    }

    return <div className="flexCenter flexDirectionColumn fullScreenHeight">
            <LoginForm onSubmit={loginFormSubmitHandler}/>
    </div>
}

export default LoginScreen;