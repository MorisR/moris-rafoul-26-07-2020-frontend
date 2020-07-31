import React from 'react';
import useStyle from "./navBarProfilePreview.style"
import InitialsAvatarIcon from "../initialsAvatarIcon";
import {Typography} from "@material-ui/core";
import {loggedInUserState} from "../../../modules/globalRecoilStates";

function NavBarProfilePreview({className}) {
    const cssClasses = useStyle()
    const [loggedInUser] = loggedInUserState()
    const user = loggedInUser.user ||{};
    return (
        <div className={`flexCenter flexDirectionColumn ${cssClasses.root} ${className}`}>
            <InitialsAvatarIcon value={user.nameInitials} spacingSize={15} className={cssClasses.icon}/>
            <Typography component={"p"} className={cssClasses.label} className={`welcome`}
                        variant={"subtitle1"}>Wellcome</Typography>
            <Typography  variant={"h6"}>{user.fullName}</Typography>
        </div>
    );
}

export default NavBarProfilePreview;