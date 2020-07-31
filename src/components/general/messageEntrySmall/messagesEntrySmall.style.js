import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
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
