import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
        backgroundColor: theme.palette.primary.contrastText,
        opacity: ".95",
        padding: theme.spacing(2),
        boxSizing: "border-box",
        borderRadius: theme.shape.borderRadius,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: theme.shadows[7],
        transition: theme.transitions.create(),
    },
    submitButton: {
        marginTop: theme.spacing(2)
    },
    rootError: {
        animation: `.5s $shake ${theme.transitions.easing.easeInOut}`
    },
    "@keyframes shake": {
        "0%": {
            transform: "translateX(0)"
        },
        "25%": {
            transform: "translateX(-10px)"
        },
        "50%": {
            transform: "translateX(10px)"
        },
        "75%": {
            transform: "translateX(-10px)"
        },
        "100%": {
            transform: "translateX(0)"
        }
    }
}))
