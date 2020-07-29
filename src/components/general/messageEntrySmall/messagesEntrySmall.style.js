import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
        background: theme.palette.background.paper,
        width: "100%",
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px  `,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",

    },
    centerContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        height: theme.spacing(7),
        width: theme.spacing(7),
        color: theme.palette.primary.contrastText,
        border: `${2}px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
    },
    textsContainer: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2),
        width: `calc(100% - ${theme.spacing(7)}px)`,
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
