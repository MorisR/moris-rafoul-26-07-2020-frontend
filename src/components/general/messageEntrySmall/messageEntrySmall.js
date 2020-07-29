import React from 'react';
import {Card, Typography, Avatar, Grid, Box} from '@material-ui/core';
import useStyle from "./messagesEntrySmall.style"
import UserData from "../../../classes/UserData";
import MessageData from "../../../classes/MessageData";



function MessageEntrySmall({messageData}) {

    const cssClasses = useStyle()

    return (<Card className={cssClasses.root} variant={"elevation"} raised={1}>
            <Avatar variant={"circle"} className={cssClasses.icon}>{messageData?.sender?.nameInitials}</Avatar>
           <div className={cssClasses.textsContainer}>
               <Typography   variant={"h6"}> {messageData?.sender?.fullName}</Typography>
               <Typography   variant={"subtitle"}> {messageData?.title}</Typography>
               <Typography className={cssClasses.textCaption} variant={"caption"}> {messageData?.content}</Typography>
               <Typography className={cssClasses.creationDate} variant={"caption"} > {messageData?.creationDateFromNow}</Typography>
           </div>

        </Card>

    );
}


//
// function MessageEntrySmall({messageData = defaultMessageData}) {
//
//     const cssClasses = useStyle()
//
//     return (<Card className={cssClasses.root} variant={"elevation"} raised={1}>
//
//             <Grid container  alignItems={"center"} justify={"space-evenly"}>
//                 <Grid  item xs={1}  >
//                     <Box className={cssClasses.centerContent}>
//                         <Avatar className={cssClasses.icon}>{messageData?.sender?.nameInitials}</Avatar>
//                     </Box >
//                 </Grid>
//                 <Grid xs={11} >
//                     <Box >
//
//                         <Typography variant={"h6"}> {messageData?.sender?.fullName}</Typography>
//                     </Box >
//                 </Grid>
//                 <Grid  item xs={1}/>
//                 <Grid xs={11} >
//                     <Box >
//                         <Typography variant={"subtitle1"}> {messageData?.title}</Typography>
//                     </Box >
//                 </Grid>
//                 <Grid  item xs={1}/>
//                 <Grid xs={11} >
//                     <Box >
//                         <Typography variant={"caption"}> {messageData?.content}</Typography>
//                     </Box >
//                 </Grid>
//
//
//
//
//
//             </Grid>
//         </Card>
//
//     );
// }

export default MessageEntrySmall;