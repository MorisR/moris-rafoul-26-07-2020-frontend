import React from 'react';
import {Card, Typography, Avatar} from '@material-ui/core';
import useStyle from "./messagesEntrySmall.style"


function MessageEntrySmall({messageData}) {

    const cssClasses = useStyle()

    return (<Card className={cssClasses.root} variant={"elevation"} raised={1}>
            <Avatar variant={"circle"} className={cssClasses.icon}>{messageData?.sender?.nameInitials}</Avatar>
            <div className={cssClasses.textsContainer}>
                <Typography variant={"h6"}> {messageData?.sender?.fullName}</Typography>
                <Typography className={cssClasses.textCaption}  variant={"subtitle"}> {messageData?.title}</Typography>
                <Typography className={cssClasses.textCaption}  variant={"caption"} color={"textSecondary"} >  {messageData?.content}</Typography>
                <Typography className={cssClasses.creationDate} variant={"caption"}> {messageData?.creationDateFromNow}</Typography>
            </div>

        </Card>

    );
}


export default MessageEntrySmall;