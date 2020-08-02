import React, {useState} from 'react';
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
import {
    loggedInUserState,
    popupMessageState,
    selectedMessagesArrayState, selectedMessageState,
    selectedNavBarItemState
} from "../../../modules/globalRecoilStates";
import ComposeEmailForm from "../composeEmailForm";
import {navBarItemsNames} from "../../../modules/constants";


function NavBar() {
    const cssClasses = useStyle()
    const theme = useTheme()
    const iconsColor = theme.palette.secondary.contrastText;
    const [{updateArray}, setSelectedMessagesArr] = selectedMessagesArrayState()
    const [, setSelectedMessage] = selectedMessageState()
    const [, setLoggedInUser] = loggedInUserState()
    const [, setPopupMessage] = popupMessageState()
    const [selectedNavBarItem, setSelectedNavBarItem] = selectedNavBarItemState()

    const [lockNavBar, setLockNavBar] = useState(false)
    const [showComposeEmailPopup, setShowComposeEmailPopup] = useState(false)


    function loadReceived() {
        (async () => {
            setSelectedNavBarItem(navBarItemsNames.INBOX)
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getReceived()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage()
            setLockNavBar(false)
        })()

    }

    function loadSent() {
        (async () => {
            setSelectedNavBarItem(navBarItemsNames.SENT)
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getSent()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage()
            setLockNavBar(false)
        })()

    }

    function loadTrash() {
        (async () => {
            setSelectedNavBarItem(navBarItemsNames.TRASH)
            setLockNavBar(true)
            const arrayOfMessages = await messagesApi.getTrash()
            setSelectedMessagesArr(messagesApi.rawArrayToClassesArray(arrayOfMessages))
            setSelectedMessage()
            setLockNavBar(false)
        })()

    }

    function logout() {
        (async () => {
            setLockNavBar(true)
            const { ok,message } = await authApi.logout()
            if(ok){
                setSelectedMessage()
                setSelectedMessagesArr()
                setLockNavBar(false)
                setLoggedInUser()
            }
            setPopupMessage(ok?{success:message}: {error:message})
        })()
    }

    function setComposeEmailVisibility(state) {
        return () => setShowComposeEmailPopup(state)
    }

    function sendEmail({email, content, subject}, setDisableFormInput) {

        (async () => {
            setDisableFormInput(true)

            const {ok, message} = await messagesApi.sendMessage({email, content, subject})
            setPopupMessage(ok ? {success: message} : {error: message})
            if (!ok)
                setDisableFormInput(false)

            else{
                await updateArray(selectedNavBarItem)
                setShowComposeEmailPopup(false)
            }

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
        return <ListItem button
                         onClick={loadReceived}
                         className={selectedNavBarItem === navBarItemsNames.INBOX ? cssClasses.selectedItem : ""}>
            <ListItemIcon><InboxIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={navBarItemsNames.INBOX}/>
        </ListItem>
    }

    function renderGetSentMessagesButton() {
        return <ListItem button
                         onClick={loadSent}
                         className={selectedNavBarItem === navBarItemsNames.SENT ? cssClasses.selectedItem : ""}>

            <ListItemIcon><MailIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={navBarItemsNames.SENT}/>
        </ListItem>
    }

    function renderGetTrashMessagesButton() {
        return <ListItem button
                         onClick={loadTrash}
                         className={selectedNavBarItem === navBarItemsNames.TRASH ? cssClasses.selectedItem : ""}>

            <ListItemIcon><DeleteIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={navBarItemsNames.TRASH}/>
        </ListItem>
    }

    function renderLogoutButton() {
        return <ListItem button onClick={logout}>
            <ListItemIcon><VpnKeyIcon htmlColor={iconsColor}/></ListItemIcon>
            <ListItemText primary={navBarItemsNames.LOGOUT}/>
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
