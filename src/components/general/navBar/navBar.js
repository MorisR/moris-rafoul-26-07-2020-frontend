import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import NavBarProfilePreview from "../navBarProfilePreview/navBarProfilePreview";
import useStyle from "./navBar.style";


function NavBar() {

    const cssClasses = useStyle()

    return (


        <nav className={cssClasses.root}>
            <NavBarProfilePreview className={cssClasses.userProfileRoot}/>
                <div className={cssClasses.listContainer}>
                    <List  >
                        {['Inbox', 'Send email', 'Trash'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </div>

        </nav>

    );
}


export default NavBar;
