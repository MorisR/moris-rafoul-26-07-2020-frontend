import React, {useState} from 'react';
import {Typography, IconButton, Toolbar, AppBar} from "@material-ui/core";
import {
    ArrowBack as BackButton,
    Delete as DeleteIcon,
    Restore as RestoreIcon,

} from "@material-ui/icons";
import {popupMessageState, selectedMessagesArrayState, selectedMessageState} from "../../../modules/globalRecoilStates";
import {messagesApi} from "../../../modules/api";
import MessageData from "../../../modules/classes/MessageData";

function AppBarMidSizeScreen() {
    const [selectedMessage, setSelectedMessage] = selectedMessageState()
    const [messagesArray, setMessagesArray] = selectedMessagesArrayState()
    const [, setPopupMessage] = popupMessageState()
    const [lockIcons, setLockIcons] = useState(false)

    function setTrashState(state) {
        return () =>
            (async () => {
                setLockIcons(true)
                const {ok, message} = await messagesApi.setTrashState(selectedMessage.id, state)
                if (ok) {
                    const updatedMessage = new MessageData({...selectedMessage.getRawObject(), inTrash: state})
                    const newArr = messagesArray.filter(data => data.id !== updatedMessage.id)
                    setSelectedMessage(updatedMessage)
                    setMessagesArray(newArr)
                }
                setPopupMessage(ok ? {success: message} : {error: message})
                setLockIcons(false)
            })()
    }


    return (
        <AppBar position="static" style={{pointerEvents:lockIcons?"none":"unset"}} >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedMessage()}>
                    <BackButton/>
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: "1"}} display={"inline"}>
                    {selectedMessage?.title}
                </Typography>

                {selectedMessage?.inTrash ?
                    <IconButton color="inherit" aria-label="delete" onClick={setTrashState(false)}>
                        <RestoreIcon/>
                    </IconButton>
                    :
                    <div>
                    <IconButton  color="inherit" aria-label="delete" onClick={setTrashState(true)}>
                        <DeleteIcon/>
                    </IconButton>
                    </div>
                }


            </Toolbar>
        </AppBar>
    );
}

export default AppBarMidSizeScreen;