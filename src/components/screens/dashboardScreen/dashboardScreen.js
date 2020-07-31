import React from 'react';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../general/navBar/navBar";
import MessagesList from "../../general/messagesEntryList/messagesList";
import MessageEntryLarge from "../../general/messageEntryLarge/messageEntryLarge";
import {selectedMessageState,selectedMessagesArrayState} from "../../../modules/globalRecoilStates";

function DashboardScreen() {
    const [selectedMessage,setSelectedMessage] = selectedMessageState()
    const [selectedMessagesArray] = selectedMessagesArrayState()

    return (

        <Grid container style={{backgroundColor: "Background"}}>
            <Grid item md={2}>
                <NavBar/>
            </Grid>
            <Grid item xs={4}>
                <MessagesList onMessageClick={setSelectedMessage} messages={selectedMessagesArray}/>
            </Grid>
            <Grid item xs={6}>
                <MessageEntryLarge messageData={selectedMessage}/>
            </Grid>

        </Grid>


    );
}

export default DashboardScreen;