import React, {useEffect} from 'react';
import {Button, TextField} from "@material-ui/core";
import { Send as SendIcon} from "@material-ui/icons";
import useStyle from "../loginForm/loginForm.style"

function ComposeEmailForm({onSubmit,onChange,className}) {
    const cssClasses = useStyle()
    const [values, setValues] = React.useState({
        subject: '',
        email: '',
        content: '',
    });
    const [formLocked, setFormLocked] = React.useState(false);

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (onSubmit)
            onSubmit(values,setFormLocked)

    };


    useEffect(() => {
        if (onChange)
            onChange(values)
    },[onChange])


    const textField = (label, valueFieldName, placeholder, autocomplete,props) => {
        return <TextField
            disabled={formLocked}
            label={label}
            variant="filled"
            fullWidth
            value={values[valueFieldName]}
            onChange={handleChange(valueFieldName)}
            placeholder={placeholder}
            autoComplete={autocomplete}
            color={"secondary"}
            {...props}
            multiline
        />
    }


    return (
        <form  onSubmit={handleFormSubmit} className={ `${cssClasses.root} ${className}`} style={{margin:"0",height:"100%"}}>
            {textField("Email", "email", "enter your email", "email",{required:true})}
            {textField("Subject", "subject", "message title", "subject",{required:true})}
            {textField("body", "content", "", "content",{rows:5})}

            <Button className={cssClasses.submitButton}
                    variant={"contained"}
                    color={"secondary"}
                    fullWidth
                    disabled={formLocked}
                    endIcon={<SendIcon/>}
                    type={"submit"}>send</Button>
        </form>
    );
}

export default ComposeEmailForm;