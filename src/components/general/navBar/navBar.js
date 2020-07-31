import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import {
    List,
    ListItem,
    Hidden,
    Button,
    ListItemIcon,
    ListItemText,
    useTheme,
    Dialog
} from '@material-ui/core';

import {
    Mail as MailIcon,
    MoveToInbox as InboxIcon,
    Delete as DeleteIcon,
    VpnKey as VpnKeyIcon,
    Add as AddIcon
} from '@material-ui/icons';

import NavBarProfilePreview from "../navBarProfilePreview";
import useStyle from "./navBar.style";
import {authApi, messagesApi} from "../../../modules/api";
import {popupMessageState, selectedMessagesArrayState, selectedMessageState} from "../../../modules/globalRecoilStates";
import ComposeEmailForm from "../composeEmailForm";


function NavBar() {
    const history = useHistory()
    const cssClasses = useStyle()
    const theme = useTheme()
    const iconsColor = theme.palette.secondary.contrastText;
    const [, setSelectedMessagesArr] = selectedMessagesArrayState()
    const [, setSelectedMessage] = selectedMessageState()
    const [, setPopupMessage] = popupMessageState()
    const [selectedNavBarItem, setSelectedNavBarItem] = popupMessageState()

    const [lockNavBar, setLockNavBar] = useState(false)
    const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false)


    function loadReceived() {
        (async () => {
            setSelectedNavBarItem("received")
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getReceived()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage(arrayOfMessages?.[0])
            setLockNavBar(false)
        })()

    }
    function loadSent() {
        (async () => {
            setSelectedNavBarItem("sent")
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getSent()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage(arrayOfMessages?.[0])
            setLockNavBar(false)
        })()

    }
    function loadTrash() {
        (async () => {
            setSelectedNavBarItem("trash")
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getTrash()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage(arrayOfMessages?.[0])
            setLockNavBar(false)
        })()

    }
    function logout() {
        setLockNavBar(true)
        authApi.logout().then(() => {
            history.push("/login")
            setLockNavBar(false)
        })
    }
    function setComposeEmailVisibility(state) {
        return () => setShowComposeEmailPopup(state)
    }
    function sendEmail({email, content, subject}, setDisableFormInput) {

        (async () => {
            setDisableFormInput(true)

            const {ok, message} = await messagesApi.sendEmail({email, content, subject})
            setPopupMessage(ok ? {success: message} : {error: message})
            if (!ok)
                setDisableFormInput(false)

            else setShowComposeEmailPopup(false)
            //todo reset the popup fields

        })()
    }


    function renderUserPreview() {
        return <NavBarProfilePreview className={cssClasses.userProfileRoot}/>
    }
    function renderListItems() {
        return <div className={cssClasses.listContainer}>
            <List className={cssClasses.list}>
                {renderComposeButton()}
                {renderGetReceivedMessagesButton()}
                {renderGetSentMessagesButton()}
                {renderGetTrashMessagesButton()}
            </List>
        </div>
    }
    function renderComposeButton() {
        return <ListItem onClick={setComposeEmailVisibility(true)}>
            <Button
                startIcon={<AddIcon/>}
                color={"secondary"}
                fullWidth
                className={cssClasses.composeButton}>
                compose
            </Button>
        </ListItem>
    }
    function renderGetReceivedMessagesButton() {
        return  <ListItem button
                          onClick={loadReceived}
                          className={selectedNavBarItem === "received"?cssClasses.selectedItem:""}>
            <ListItemIcon><InboxIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary="Inbox"/>
        </ListItem>
    }
    function renderGetSentMessagesButton() {
        return <ListItem button
                         onClick={loadSent}
                         className={selectedNavBarItem === "sent"?cssClasses.selectedItem:""}>

            <ListItemIcon><MailIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={"Sent"}/>
        </ListItem>
    }
    function renderGetTrashMessagesButton() {
        return <ListItem button
                         onClick={loadTrash}
                         className={selectedNavBarItem === "trash"?cssClasses.selectedItem:""}>

        <ListItemIcon><DeleteIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary="Trash"/>
        </ListItem>
    }
    function renderLogoutButton() {
        return <ListItem button onClick={logout}>
            <ListItemIcon><VpnKeyIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={"logout"}/>
        </ListItem>
    }
    function renderComposeMessagePopup() {
        return <Hidden>
            <Dialog
                open={showComposeEmailPopup}
                fullScreen
                PaperProps={{className: cssClasses.sendMessagePopup}}
                onClose={setComposeEmailVisibility(false)}>


                <ComposeEmailForm onSubmit={sendEmail}/>
            </Dialog>
        </Hidden>
    }




    return (

        <nav className={cssClasses.root} style={{pointerEvents: lockNavBar ? "none" : "unset"}}>
            {renderUserPreview()}
            {renderListItems()}
            {renderLogoutButton()}
            {renderComposeMessagePopup()}
        </nav>

    );
}


export default NavBar;
