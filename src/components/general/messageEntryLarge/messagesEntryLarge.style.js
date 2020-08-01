import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
        backgroundColor: theme.palette.background.default,

        "& *":
            {},
        "& > *":
            {paddingBottom: theme.spacing(1),},
        boxSizing: "border-box",
        padding: theme.spacing(2),
        minHeight: "100vh",
        maxHeight: "100vh",
    },

    headerTexts:{
        paddingLeft:theme.spacing(2),

    },
    creationDate: {
        paddingTop: theme.spacing(1),
        alignSelf: "flex-end"
    },
    messageContent: {
        overflowY: "scroll"
    }
}))
