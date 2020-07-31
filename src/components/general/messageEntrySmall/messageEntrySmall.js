import React from 'react';
import {Typography, ListItem, ListItemAvatar, ListItemText, useTheme} from '@material-ui/core';
import useStyle from "./messagesEntrySmall.style"
import InitialsAvatarIcon from "../../initialsAvatarIcon/initialsAvatarIcon";


function MessageEntrySmall({messageData, onClick}) {

    const cssClasses = useStyle()
    const theme = useTheme()

    return (
        <ListItem onClick={onClick} button className={cssClasses.root} alignItems="flex-start">
            <ListItemAvatar>
                <InitialsAvatarIcon style={{marginRight: `${theme.spacing(2)}px`}}
                                    value={messageData?.sender?.nameInitials} spacingSize={6}/>
            </ListItemAvatar>
            <ListItemText
                primary={messageData?.sender?.fullName}
                secondary={
                    <React.Fragment>
                        <div className={cssClasses.textsContainer}>
                            <Typography className={cssClasses.textCaption} variant={"subtitle1"}
                                        color={"textSecondary"}>  {messageData?.title}</Typography>
                            <Typography className={cssClasses.textCaption} variant={"caption"}
                                        color={"textSecondary"}>  {messageData?.content}</Typography>
                            <Typography className={cssClasses.creationDate}
                                        variant={"caption"}> {messageData?.creationDateFromNow}</Typography>
                        </div>
                    </React.Fragment>
                }
            />
        </ListItem>

    );
}


export default MessageEntrySmall;