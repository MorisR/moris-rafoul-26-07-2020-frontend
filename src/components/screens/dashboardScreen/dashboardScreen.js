import React from 'react';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../general/navBar";
import MessagesList from "../../general/messagesList";
import MessageEntryLarge from "../../general/messageEntryLarge";
import {selectedMessageState, selectedMessagesArrayState} from "../../../modules/globalRecoilStates";
import {messagesApi} from "../../../modules/api";

function DashboardScreen() {
    const [selectedMessage, setSelectedMessage] = selectedMessageState()
    const [selectedMessagesArray, setSelectedMessagesArray] = selectedMessagesArrayState()

    async function markMessageAsRead(message) {
        await messagesApi.setReadState(message.id, true)
        let newMessageData = await messagesApi.getMessage(message.id)
        newMessageData = messagesApi.rawToClass(newMessageData)
        return newMessageData
    }

    function handleOnMessageClick(message,disableMessagesSelection) {
        (async () => {
            disableMessagesSelection(true)
            const newMessageData = await markMessageAsRead(message)
            const newArr = selectedMessagesArray.map(data=> data.id=== newMessageData.id? newMessageData : data)

            setSelectedMessagesArray(newArr)
            setSelectedMessage(newMessageData)
            disableMessagesSelection(false)

        })()
    }

    return (

        <Grid container style={{backgroundColor: "Background"}}>
            <Grid item md={2}>
                <NavBar/>
            </Grid>
            <Grid item xs={4}>
                <MessagesList onMessageClick={handleOnMessageClick} messages={selectedMessagesArray}/>
            </Grid>
            <Grid item xs={6}>
                <MessageEntryLarge messageData={selectedMessage}/>
            </Grid>

        </Grid>


    );
}

export default DashboardScreen;