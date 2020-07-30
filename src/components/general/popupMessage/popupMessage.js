import React from 'react';
import AlertMessage from "../alertMessage/alertMessage";
import { popupMessageState} from "../../../modules/globalRecoilStates";

function PopupMessage() {
    const [popupMessage, setPopupMessage] = popupMessageState()
    const handlerErrorPopupClose = () => {
        setPopupMessage({})
    }
    return (
        <div>
            <AlertMessage show={(popupMessage.error || popupMessage.success)}
                          severity={popupMessage.error?"error": undefined }
                          onClose={handlerErrorPopupClose} >
                {popupMessage.error || popupMessage.success}
            </AlertMessage>
        </div>
    );
}

export default PopupMessage;