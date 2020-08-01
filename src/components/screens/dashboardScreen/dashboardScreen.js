import React from 'react';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../general/navBar";
import MessagesList from "../../general/messagesList";
import MessageEntryLarge from "../../general/messageEntryLarge";
import {
    selectedMessageState,
    selectedMessagesArrayState,
} from "../../../modules/globalRecoilStates";
import {messagesApi} from "../../../modules/api";
import {Hidden} from "@material-ui/core";
import AppBarMidSizeScreen from "../../general/appBarMidSizeScreen";
import AppBarSmallSizeScreen from "../../general/appBarSmallSizeScreen";

function DashboardScreen() {
    const [selectedMessagesArray, setSelectedMessagesArray] = selectedMessagesArrayState()
    const [selectedMessage, setSelectedMessage] = selectedMessageState()


    async function markMessageAsRead(message) {
        await messagesApi.setReadState(message.id, true)
        let newMessageData = await messagesApi.getMessage(message.id)
        newMessageData = messagesApi.rawToClass(newMessageData)
        return newMessageData
    }
    function handleOnMessageClick(message, disableMessagesSelection) {
        (async () => {
            disableMessagesSelection(true)
            //load the element
            setSelectedMessage(message)

            const newMessageData = await markMessageAsRead(message)
            const newArr = selectedMessagesArray.map(data => data.id === newMessageData.id ? newMessageData : data)

            //load the element again after update
            setSelectedMessage(newMessageData)
            setSelectedMessagesArray(newArr)
            disableMessagesSelection(false)

        })()
    }

    function ifMessageIsSelected(elementToRender) {
        if (selectedMessage)
            return elementToRender
    }
    function ifMessageIsNotSelected(elementToRender) {
        if (!selectedMessage)
            return elementToRender
    }

    return (

        <Grid container style={{backgroundColor: "Background"}}>

            <Grid item md={2} sm={3}>
                <Hidden xsDown>
                    <NavBar/>
                </Hidden>
            </Grid>

            <Grid item md={4} sm={9} xs={12}>

                <Hidden mdUp>
                    <Hidden smUp>
                        <AppBarSmallSizeScreen title={selectedMessage?.title} onBackClick={()=>setSelectedMessage()} />
                    </Hidden>

                {ifMessageIsSelected(
                    <>
                        <Hidden mdUp >
                            <Hidden xsDown>
                                <AppBarMidSizeScreen />
                            </Hidden>
                            <MessageEntryLarge messageData={selectedMessage}/>
                        </Hidden>
                    </>
                )}
                {ifMessageIsNotSelected(
                    <Hidden>
                        <MessagesList onMessageClick={handleOnMessageClick} messages={selectedMessagesArray}/>
                    </Hidden>
                )}
                </Hidden>
                <Hidden smDown>
                    <MessagesList onMessageClick={handleOnMessageClick} messages={selectedMessagesArray}/>
                </Hidden>
            </Grid>

            <Grid item md={6}>
                <Hidden smDown>
                    <MessageEntryLarge messageData={selectedMessage}/>
                </Hidden>
            </Grid>

        </Grid>


    );
}

export default DashboardScreen;