import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({

    root: {
        color: theme.palette.primary.contrastText,
        border: `${2}px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],

    },


}))
