import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
        backgroundColor: theme.palette.grey["300"],
        color: theme.palette.primary.main,
        maxHeight: '100vh',
        minHeight:"100vh",
        overflowY:"scroll",
        boxSizing:"border-box",
    },


}))
