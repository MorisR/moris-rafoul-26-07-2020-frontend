import React from 'react';
import MessageEntrySmall from "../messageEntrySmall/messageEntrySmall";
import {List} from '@material-ui/core';
import useStyle from "./messagesList.style"
import Divider from "@material-ui/core/Divider";

function MessagesList({messages = []}) {
    const cssClasses = useStyle()
    return (
        <List className={cssClasses.root}>
            {
                messages.map(message =>
                    <>
                        <MessageEntrySmall messageData={message}/>
                        <Divider />
                    </>
                )
            }
        </List>

    );

}

export default MessagesList;