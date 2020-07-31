import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    label:{
        paddingTop:theme.spacing(2)
    },
    root:{
        boxSizing:"border-box",
        color: theme.palette.secondary.contrastText,

    },
    icon:{
        backgroundColor: `${theme.palette.secondary.light} !important`,
        color: `${theme.palette.secondary.contrastText} !important`,
    },

}));
