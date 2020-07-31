import React, {useState} from 'react';
import MessageEntrySmall from "../messageEntrySmall";
import {List, Typography} from '@material-ui/core';
import useStyle from "./messagesList.style"
import Divider from "@material-ui/core/Divider";
import {selectedMessageState} from "../../../modules/globalRecoilStates";

function MessagesList({messages = [], onMessageClick}) {
    const cssClasses = useStyle()
    const [lockSelection, setLockSelection] = useState(false)
    const [selectedMessage] = selectedMessageState()


    function handleElementClick(messageData) {
        return () => onMessageClick(messageData, setLockSelection)
    }


    if (!messages.length)
        return <div>
            <Typography variant={"subtitle2"} className={`${cssClasses.root} flexCenter`}>Empty</Typography>
        </div>


    return (
        <List component={"div"} style={{pointerEvents: lockSelection ? "none" : "unset"}} className={cssClasses.root}>
            {
                messages.map(message =>
                    <div key={message.id}>
                        <MessageEntrySmall
                            className={(selectedMessage?.id === message.id) ? cssClasses.selectedItem : " "}
                            onClick={handleElementClick(message)}
                            messageData={message}/>
                        <Divider/>
                    </div>
                )
            }
        </List>
    );

}

export default MessagesList;