import React, {useEffect} from 'react';
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel, Link,
    TextField,
} from "@material-ui/core";

import {Visibility, VisibilityOff} from "@material-ui/icons";
import useLoginStyle from "../loginForm/loginForm.style"
import {routes} from "../../../modules/constants";
import {popupMessageState} from "../../../modules/globalRecoilStates";

function RegisterForm({onChange, onSubmit}) {
    const cssLoginClasses = useLoginStyle()
    const [popupMessage] = popupMessageState()

    const [values, setValues] = React.useState({
        password: '',
        email: '',
        confirmPassword: "",
        firstName: "",
        lastName: "",

        showPassword: false,
        showConfirmPassword: false,

    });

    const [formLocked, setFormLocked] = React.useState(false);

    useEffect(() => {
        if (onChange)
            onChange(values)
    })

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (onSubmit)
            onSubmit(values,setFormLocked)
    };
    const handleClickShowPassword = (fieldName) => () => {
        setValues({...values, [fieldName]: !values[fieldName]});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const textField = (label, valueFieldName, placeholder, autocomplete) => {
        return <TextField
            disabled={formLocked}
            required
            label={label}
            variant="filled"
            fullWidth
            value={values[valueFieldName]}
            onChange={handleChange(valueFieldName)}
            placeholder={placeholder}
            autoComplete={autocomplete}
        />
    }
    const passwordField = (label, valueFieldName, visibilityFieldName, placeholder, autocomplete) => {
        return <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor={valueFieldName}>{label}</InputLabel>
            <FilledInput
                disabled={formLocked}
                required
                id={valueFieldName}
                type={values[visibilityFieldName] ? 'text' : 'password'}
                value={values[valueFieldName]}
                placeholder={placeholder}
                onChange={handleChange(valueFieldName)}
                autoComplete={autocomplete}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword(visibilityFieldName)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values[visibilityFieldName] ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    }


    return (
        <form onSubmit={handleFormSubmit}
              className={`${cssLoginClasses.root} ${popupMessage.error ? cssLoginClasses.rootError : ""}`}>

            {textField("Email", "email", "enter your email", "email")}
            {textField("First Name", "firstName", "enter your first name", "given-name")}
            {textField("Last Name", "lastName", "enter your last name", "family-name")}
            {passwordField("Password", "password", "showPassword", "enter your password", "new-password")}
            {passwordField("Confirm Password", "confirmPassword", "showConfirmPassword", "confirm your password", "new-password")}


            <Button className={cssLoginClasses.submitButton}
                    variant={"contained"}
                    color={"primary"}
                    fullWidth
                    disabled={formLocked}
                    type={"submit"}>Register!</Button>

            <Link href={routes.LOGIN}>already a registered user? login.</Link>

        </form>

    );
}

export default RegisterForm;