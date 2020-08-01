import React from 'react';
import {Typography,IconButton,Toolbar,AppBar} from "@material-ui/core";
import {ArrowBack as BackButton} from "@material-ui/icons";
import {selectedMessageState} from "../../../modules/globalRecoilStates";

function AppBarMidSizeScreen() {
    const [selectedMessage, setSelectedMessage] = selectedMessageState()

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="back" onClick={()=>setSelectedMessage()}>
                    <BackButton />
                </IconButton>
                <Typography variant="h6" >
                    {selectedMessage?.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarMidSizeScreen;