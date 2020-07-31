import React from 'react';
import {Typography} from '@material-ui/core';
import useStyle from "./messagesEntryLarge.style"
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InitialsAvatarIcon from "../initialsAvatarIcon";


function MessageEntryLarge({messageData}) {

    const cssClasses = useStyle()

    if (!messageData)
        return <Grid container className={cssClasses.root} alignItems={"center"} justify={"center"}>
            <Grid style={{textAlign:"center"}} item sm={12}><Typography variant={"h5"}>No message selected</Typography></Grid>
        </Grid>


    return (
        <Grid container component={"main"} alignContent={"flex-start"} className={cssClasses.root}>

            {/*header-------------------------------------------*/}
            <Grid item sm={12} className={cssClasses.header}>
                <Grid container alignItems={"center"}>
                    <Grid item sm={2}>
                        <InitialsAvatarIcon value={messageData?.sender?.nameInitials} spacingSize={9}/>
                    </Grid>
                    <Grid container item sm={10} className={cssClasses.headerTexts}>
                        <Grid item sm={12}>
                            <Typography display={"inline"} variant={"h6"}
                                        color={"textPrimary"}>{messageData?.title}</Typography>
                        </Grid>

                        <Grid item sm={12}>
                            <Typography display={"inline"} variant={"subtitle2"}
                                        color={"textPrimary"}>{messageData?.sender.fullName}</Typography>

                            <Typography display={"inline"} variant={"subtitle1"}
                                        color={"textPrimary"}>   &nbsp;to    &nbsp;</Typography>

                            <Typography display={"inline"} variant={"subtitle2"}
                                        color={"textPrimary"}>{messageData?.sender.fullName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Grid item sm={12}>
                <Divider/>

            </Grid>
            {/*body---------------------------------------------*/}
            <Grid item sm={12}>
                <Typography component={"p"} display={"inline"} variant={"subtitle2"}
                            color={"textPrimary"}>{messageData?.content}</Typography>

            </Grid>
        </Grid>

    );
}


export default MessageEntryLarge;