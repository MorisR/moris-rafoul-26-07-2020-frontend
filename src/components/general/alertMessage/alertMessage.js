import React from 'react';
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function AlertMessage({show = false, onClose,children , severity = "info"}) {
    return (
        <div>
            <Snackbar open={show} autoHideDuration={2000} onClose={onClose}>
                <Alert elevation={6} onClose={onClose} severity={severity}>
                    {children}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertMessage;