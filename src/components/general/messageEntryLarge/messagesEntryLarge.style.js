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
    headerIcon: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    header:{
        height:theme.spacing(10)
    },
    headerTexts:{
        paddingLeft:theme.spacing(1),

    },
    creationDate: {
        paddingTop: theme.spacing(1),
        alignSelf: "flex-end"
    },
    messageContent: {
        overflowY: "scroll"
    }
}))
