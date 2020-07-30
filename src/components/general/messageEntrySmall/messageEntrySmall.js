import React from 'react';
import {Card, Typography, Avatar,ListItem,ListItemAvatar,ListItemText} from '@material-ui/core';
import useStyle from "./messagesEntrySmall.style"


function MessageEntrySmall({messageData}) {

    const cssClasses = useStyle()

    return (
        <ListItem button className={cssClasses.root} alignItems="flex-start">
            <ListItemAvatar >
                <Avatar variant={"circle"} className={cssClasses.icon} >{messageData?.sender?.nameInitials}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={messageData?.sender?.fullName}
                secondary={
                    <React.Fragment>
                        <div className={cssClasses.textsContainer}>
                             <Typography className={cssClasses.textCaption}  variant={"subtitle1"} color={"textSecondary"} >  {messageData?.title}</Typography>
                             <Typography className={cssClasses.textCaption}  variant={"caption"} color={"textSecondary"} >  {messageData?.content}</Typography>
                            <Typography className={cssClasses.creationDate} variant={"caption"}> {messageData?.creationDateFromNow}</Typography>
                        </div>
                    </React.Fragment>
                }
            />
        </ListItem>

    );
}




export default MessageEntrySmall;