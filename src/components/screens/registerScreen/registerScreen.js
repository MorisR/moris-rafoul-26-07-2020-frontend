import React from 'react';
import {authApi} from "../../../modules/api";
import { popupMessageState} from "../../../modules/globalRecoilStates";
import RegisterForm from "../../general/registerForm";



function RegisterScreen({onRegister}) {
    const [, setPopupMessage] = popupMessageState()



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
            onRegister && onRegister({email, password, firstName, lastName})
        })()

    }

    return <div className="flexCenter flexDirectionColumn fullScreenHeight">

            <RegisterForm onSubmit={registerFormSubmitHandler}/>
    </div>
}

export default RegisterScreen;