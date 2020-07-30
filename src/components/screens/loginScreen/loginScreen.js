import React from 'react';

import LoginForm from "../../general/loginForm/loginForm";
import {authApi} from "../../../modules/api";
import {loggedInUserState, popupMessageState} from "../../../modules/globalRecoilStates";
import UserData from "../../../modules/classes/UserData";
import {Fade} from "@material-ui/core";
import {routes} from "../../../modules/constants";
import {useHistory} from "react-router-dom";


function LoginScreen() {
    const [, setLoggedInUser] = loggedInUserState()
    const [, setPopupMessage] = popupMessageState()

    const history = useHistory()

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
            history.push(routes.DASHBOARD)


        })()


    }

    return <div className="flexCenter flexDirectionColumn fullScreenHeight">
        <Fade>
            <LoginForm onSubmit={loginFormSubmitHandler}/>
        </Fade>
    </div>
}

export default LoginScreen;