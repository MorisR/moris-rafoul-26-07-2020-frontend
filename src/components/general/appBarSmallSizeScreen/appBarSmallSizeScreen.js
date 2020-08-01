import React, {useState} from 'react';
import {Typography, IconButton, Toolbar, AppBar, Drawer} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";
import {selectedMessageState, selectedNavBarItemState} from "../../../modules/globalRecoilStates";
import AppBarMidSizeScreen from "../appBarMidSizeScreen";
import NavBar from "../navBar";

function AppBarSmallSizeScreen() {
    const [selectedMessage] = selectedMessageState()
    const [drawerVisible, SetDrawerVisible] = useState(false)
    const [selectedNavBarItem] = selectedNavBarItemState()


    function toggleDrawer() {
        SetDrawerVisible(!drawerVisible)
    }


    if (selectedMessage)
        return <AppBarMidSizeScreen/>

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer} color="inherit" aria-label="menu">
                        <MenuIcon/>
                        <Drawer anchor={"left"} open={drawerVisible} onClose={toggleDrawer}>
                            <NavBar/>
                        </Drawer>
                    </IconButton>
                    <Typography variant="h6">
                        {selectedNavBarItem}
                    </Typography>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default AppBarSmallSizeScreen;