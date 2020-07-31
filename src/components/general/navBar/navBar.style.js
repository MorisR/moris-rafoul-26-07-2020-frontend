import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root:{
        minHeight:"100vh",
        maxHeight:"100vh",
        boxSizing:"border-box",
    },
    userProfileRoot:{
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
    },

    listContainer:{
        display:"flex",
        alignItems:"center",
        height: "50vh",
        minHeight: "200px",
        color:theme.palette.primary.contrastText,

    }

}));
