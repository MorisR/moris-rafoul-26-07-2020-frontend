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

    const [lockNavBar, setLockNavBar] = useState(false)
    const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false)

    function loadReceived() {
        (async () => {
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getReceived()
            setSelectedMessagesArr(messagesApi.rawToClass(arrayOfMessages))
            setSelectedMessage(arrayOfMessages?.[0])
            setLockNavBar(false)
        })()

    }

    function loadSent() {
        (async () => {
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getSent()
            setSelectedMessagesArr(messagesApi.rawToClass(arrayOfMessages))
            setSelectedMessage(arrayOfMessages?.[0])
            setLockNavBar(false)
        })()

    }

    function loadTrash() {
        (async () => {
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getTrash()
            setSelectedMessagesArr(messagesApi.rawToClass(arrayOfMessages))
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
            setPopupMessage(ok?{success:message} :{error:message} )
            if (!ok)
                setDisableFormInput(false)

            else setShowComposeEmailPopup(false)
                //todo reset the popup fields

        })()
    }

    return (

        <nav className={cssClasses.root} style={{pointerEvents: lockNavBar ? "none" : "unset"}}>
            <NavBarProfilePreview className={cssClasses.userProfileRoot}/>
            <div className={cssClasses.listContainer}>
                <List className={cssClasses.list}>
                    <ListItem onClick={setComposeEmailVisibility(true)}>
                        <Button
                            startIcon={<AddIcon/>}
                            color={"secondary"}
                            fullWidth
                            className={cssClasses.composeButton}>
                            compose
                        </Button>
                    </ListItem>
                    <ListItem button onClick={loadReceived}>
                        <ListItemIcon><InboxIcon htmlColor={iconsColor}/></ListItemIcon>
                        <ListItemText primary="Inbox"/>
                    </ListItem>
                    <ListItem button onClick={loadSent}>
                        <ListItemIcon><MailIcon htmlColor={iconsColor}/></ListItemIcon>
                        <ListItemText primary="Send email"/>
                    </ListItem>
                    <ListItem button onClick={loadTrash}>
                        <ListItemIcon><DeleteIcon htmlColor={iconsColor}/></ListItemIcon>
                        <ListItemText primary="Trash"/>
                    </ListItem>
                </List>
            </div>
            <ListItem button onClick={logout}>
                <ListItemIcon><VpnKeyIcon htmlColor={iconsColor}/></ListItemIcon>
                <ListItemText primary={"logout"}/>
            </ListItem>
            <Hidden>
                <Dialog open={showComposeEmailPopup} onClose={setComposeEmailVisibility(false)}>
                    <ComposeEmailForm onSubmit={sendEmail}/>
                </Dialog>
            </Hidden>
        </nav>

    );
}


export default NavBar;
