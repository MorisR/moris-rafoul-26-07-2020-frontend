import React from 'react';
import {Typography,Hidden} from '@material-ui/core';
import useStyle from "./messagesEntryLarge.style"
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InitialsAvatarIcon from "../initialsAvatarIcon";


function MessageEntryLarge({messageData}) {

    const cssClasses = useStyle()

    if (!messageData)
        return <Grid container className={cssClasses.root} alignItems={"center"} justify={"center"}>
            <Grid style={{textAlign: "center"}} item sm={12}><Typography variant={"h5"}>No message selected</Typography></Grid>
        </Grid>

    function renderHeader() {
        return <Grid container item xs={12}>

            <Grid item sm={2}>
                <InitialsAvatarIcon value={messageData?.sender?.nameInitials} spacingSize={9}/>
            </Grid>
            <Grid container item xs={10} className={cssClasses.headerTexts}>
                <Grid item xs={12}>
                    <Typography display={"inline"} variant={"h6"}
                                color={"textPrimary"}>{messageData?.title}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography display={"inline"} variant={"subtitle2"}
                                color={"textPrimary"}>{messageData?.sender.fullName}</Typography>

                    <Typography display={"inline"} variant={"subtitle1"}
                                color={"textPrimary"}>   &nbsp;to    &nbsp;</Typography>

                    <Typography display={"inline"} variant={"subtitle2"}
                                color={"textPrimary"}>{messageData?.sender.fullName}</Typography>

                    <Hidden smUp>
                        <Typography display={"block"} variant={"subtitle2"} align={"left"}
                                    color={"textPrimary"}>{messageData?.creationDate.toDateString()} ({messageData?.creationDateFromNow})</Typography>
                    </Hidden>
                    <Hidden xsDown>
                        <Typography display={"block"} variant={"subtitle2"} align={"right"}
                                    color={"textPrimary"}>{messageData?.creationDate.toDateString()} ({messageData?.creationDateFromNow})</Typography>
                    </Hidden>
                </Grid>
            </Grid>
        </Grid>

    }

    function renderDivider() {
        return <Grid item xs={12}>
            <Divider/>
        </Grid>
    }

    function renderBody() {
        return <Grid item xs={12}>
            <Typography component={"p"} display={"inline"} variant={"subtitle2"}
                        color={"textPrimary"}>{messageData?.content}</Typography>

        </Grid>
    }

    return (
        <Grid container component={"main"} alignContent={"flex-start"} className={cssClasses.root}>

            {renderHeader()}
            {renderDivider()}
            {renderBody()}

        </Grid>

    );
}


export default MessageEntryLarge;