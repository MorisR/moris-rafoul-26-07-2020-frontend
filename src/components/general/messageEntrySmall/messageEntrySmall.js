import React from 'react';
import {Typography, ListItem, Badge, ListItemAvatar, ListItemText, useTheme} from '@material-ui/core';
import useStyle from "./messagesEntrySmall.style"
import InitialsAvatarIcon from "../initialsAvatarIcon";
import {loggedInUserState} from "../../../modules/globalRecoilStates";


function MessageEntrySmall({messageData, onClick, className}) {
    const [{user: loggedInUser}] = loggedInUserState()
    const cssClasses = useStyle()
    const theme = useTheme()

    function getSenderName() {
        console.log()
        if (loggedInUser.id !== messageData?.sender.id)
            return messageData?.sender?.fullName
        else return "To: " + messageData?.receiver?.fullName
    }

    return (
        <ListItem component={"div"} onClick={onClick} button className={`${cssClasses.root} ${className}`}
                  alignItems="flex-start">
            <ListItemAvatar>
                <Badge
                    invisible={messageData?.isRead}
                    color="secondary"
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    badgeContent="new"
                    style={{marginRight: `${theme.spacing(2)}px`}}>
                    <InitialsAvatarIcon value={messageData?.sender?.nameInitials} spacingSize={6}/>
                </Badge>

            </ListItemAvatar>


            <ListItemText secondaryTypographyProps={{component: "div"}}
                          primary={getSenderName()}
                          secondary={
                              <React.Fragment>
                                  <div className={cssClasses.textsContainer}>
                                      <Typography className={cssClasses.textCaption} variant={"subtitle1"}
                                                  color={"textSecondary"}>{messageData?.title}</Typography>
                                      <Typography className={cssClasses.textCaption} variant={"caption"}
                                                  color={"textSecondary"}>{messageData?.content}</Typography>
                                      <Typography className={cssClasses.creationDate}
                                                  variant={"caption"}>{messageData?.creationDateFromNow}</Typography>
                                  </div>
                              </React.Fragment>
                          }
            />
        </ListItem>

    );
}


export default MessageEntrySmall;