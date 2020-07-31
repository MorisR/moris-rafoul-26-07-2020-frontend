import React from 'react';
import {Avatar,useTheme} from "@material-ui/core";
import useStyle from "./initialsAvatarIcon.style"
function InitialsAvatarIcon({value,style,className,spacingSize = 1,variant = "circle" }) {
    const cssClasses = useStyle()
    const theme = useTheme()
    return (
        <Avatar variant={variant}
                style={{...style, width:`${theme.spacing(spacingSize)}px`,height:`${theme.spacing(spacingSize)}px`}}
                className={`${cssClasses.root} ${className}`} >{value}</Avatar>
    );
}

export default InitialsAvatarIcon;