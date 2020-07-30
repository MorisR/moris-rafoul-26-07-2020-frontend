import React from 'react';
import {authApi} from "../../../modules/api";
import {loggedInUserState, popupMessageState} from "../../../modules/globalRecoilStates";
import UserData from "../../../modules/classes/UserData";
import {Fade} from "@material-ui/core";
import RegisterForm from "../../general/registerForm/registerForm";
import {useHistory} from "react-router-dom"
import {routes} from "../../../modules/constants";

function RegisterScreen() {
    const [, setLoggedInUser] = loggedInUserState()
    const [, setPopupMessage] = popupMessageState()

    const history = useHistory()

    function registerFormSubmitHandler({email, password, firstName, lastName, confirmPassword} = {}, lockForm) {

        (async () => {
            if (confirmPassword !== password)
                return setPopupMessage({error:"passwords do not match!"})
            lockForm(true)

            const {ok, message} = await authApi.register({email, password, firstName, lastName})

            if (!ok) {
                setPopupMessage({error:message})
                lockForm(false)
                return;
            }

            setPopupMessage({success:message})
            const {ok: loginOk, user} = await authApi.login(email, password)
            if (loginOk) {
                setLoggedInUser(new UserData(user))
                history.push(routes.DASHBOARD)
            }

        })()

    }

    return <div className="flexCenter flexDirectionColumn fullScreenHeight">

        <Fade>
            <RegisterForm onSubmit={registerFormSubmitHandler}/>
        </Fade>
    </div>
}

export default RegisterScreen;