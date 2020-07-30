import React from 'react';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../general/navBar/navBar";
import MessagesList from "../../general/messagesEntryList/messagesList";
import UserData from "../../../modules/classes/UserData";
import MessageData from "../../../modules/classes/MessageData";

const user = new UserData({email:"test@gmail.com", firstName:"moris", lastName:"rafoul",id:1})
const message = new MessageData({title:"this is a test", sender:user, receiver:user,id:1})
const messagesArr = [
    message,
    message,
    message,
    message,
    message,
    message,
    message,
    message,
    message,
]
function DashboardScreen(props) {


    return (

            <Grid container >
                    <Grid item md={2}>
                    <NavBar/>
                </Grid>
                <Grid item xs={3} ms={4}>
                    <MessagesList messages={messagesArr}/>
                </Grid>
                <Grid item xs={0} ms={5} >

                </Grid>

            </Grid>



    );
}

export default DashboardScreen;