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
        maxHeight:"100vh",
        minHeight:"100vh",
        overflowY:"scroll"
    },

    headerTexts:{
        paddingLeft:theme.spacing(2),

    },
    creationDate: {
        paddingTop: theme.spacing(1),
        alignSelf: "flex-end"
    },
    messageContent: {
        wordBreak:'word',
        overflowY: "scroll",
        paddingBottom: "70px"
}
}))
