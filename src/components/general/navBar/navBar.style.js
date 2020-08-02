import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root:{
        minHeight:"100vh",
        maxHeight:"100vh",
        boxSizing:"border-box",
        color:theme.palette.primary.contrastText,
        backgroundColor:theme.palette.primary.dark
    },
    userProfileRoot:{
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
    },
    list:{
        width:"100%",

    },
    listContainer:{
        display:"flex",
        alignItems:"center",
        height: "50vh",
        minHeight: "200px",
        width:"100%",
    },
    composeButton:{
        backgroundColor:theme.palette.secondary.light,
        color:theme.palette.secondary.contrastText,
        "&$selected": {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,

        },
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
        },
    },
    selectedItem:{
        backgroundColor:theme.palette.secondary.light,
        "&$selected": {
            backgroundColor:theme.palette.secondary.light,
        },
        "&:hover": {
            backgroundColor:theme.palette.secondary.light,
        },
    }
}));
