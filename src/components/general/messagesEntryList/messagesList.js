import React from 'react';
import MessageEntrySmall from "../messageEntrySmall";
import { List, Typography} from '@material-ui/core';
import useStyle from "./messagesList.style"
import Divider from "@material-ui/core/Divider";

function MessagesList({messages = [],onMessageClick}) {
    const cssClasses = useStyle()

    if(!messages.length)
        return <div>
            <Typography variant={"subtitle2"} className={`${cssClasses.root} flexCenter`}>Empty</Typography>
        </div>
    return (
        <List component={"div"} className={cssClasses.root} >
            {
                messages.map(message =>
                    <div key={message.id}>
                        <MessageEntrySmall onClick={()=>onMessageClick(message)} messageData={message}/>
                        <Divider />
                    </div>
                )
            }
        </List>

    );

}

export default MessagesList;