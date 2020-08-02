import React  from 'react';
import {Dialog, Hidden} from "@material-ui/core";
import ComposeEmailForm from "../composeEmailForm";
import {messagesApi} from "../../../modules/api";
import composeMessagePopVisibilityState from "../../../modules/globalRecoilStates/composeMessagePopVisibilityState";
import useStyle from "./composeMessagePopup.style"
import {
    popupMessageState,
    selectedMessagesArrayState,
    selectedNavBarItemState
} from "../../../modules/globalRecoilStates";




function ComposeMessagePopup() {
    const [showComposeEmailPopup, setShowComposeEmailPopup] = composeMessagePopVisibilityState()
    const [{updateArray}] = selectedMessagesArrayState()
    const [selectedNavBarItem] = selectedNavBarItemState()
    const [, setPopupMessage] = popupMessageState()
    const cssClasses = useStyle()

    function sendEmail({email, content, subject}, setDisableFormInput) {

        (async () => {
            setDisableFormInput(true)

            const {ok, message} = await messagesApi.sendMessage({email, content, subject})
            setPopupMessage(ok ? {success: message} : {error: message})
            if (!ok)
                setDisableFormInput(false)

            else{
                await updateArray(selectedNavBarItem)
                setShowComposeEmailPopup(false)
            }

        })()
    }
    return (

        <Hidden>
            <Dialog
                open={showComposeEmailPopup}
                fullScreen
                PaperProps={{className: cssClasses.root}}
                onClose={()=>setShowComposeEmailPopup(false)}>


                <ComposeEmailForm onSubmit={sendEmail}/>
            </Dialog>
        </Hidden>


    );
}

export default ComposeMessagePopup;