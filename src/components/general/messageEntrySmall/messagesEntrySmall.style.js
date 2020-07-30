import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
    },
    icon: {
        color: theme.palette.primary.contrastText,
        border: `${2}px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
        width:theme.spacing(6),
        height:theme.spacing(6),
        marginRight:theme.spacing(2),
    },
    textsContainer: {
        display: "flex",
        flexDirection: "column",
        width: `100%`,
        boxSizing: "border-box",
    },
    textCaption: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace:"nowrap",
        width: "90%",
    },
    creationDate: {
        paddingTop: theme.spacing(1),
        alignSelf: "flex-end"
    },

}))
