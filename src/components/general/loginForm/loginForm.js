import React, {useEffect, useRef} from 'react';
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
} from "@material-ui/core";
import {AccountCircle, Visibility, VisibilityOff} from "@material-ui/icons";
import useStyle from "./loginForm.style"
import AlertMessage from "../alertMessage/alertMessage";

function LoginForm({onChange, onSubmit}) {
    const cssClasses = useStyle()

    const [values, setValues] = React.useState({
        password: '',
        email: '',
        showPassword: false,
    });
    const [popupMessage, setPopupMessage] = React.useState({
        error: undefined,
        success: undefined
    });
    const [formLocked, setFormLocked] = React.useState(false);

    useEffect(() => {
        if (onChange)
            onChange(values)
    })

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleFormSubmit = (event) => {
        if (onSubmit)
            onSubmit(event, values, {
                showErrorMessage: (message)=> setPopupMessage({error: message}),
                showSuccessMessage: (message)=> setPopupMessage({success: message}),
                lockForm: (state)=> setFormLocked(state),

            })
    };
    const handlerErrorPopupClose = () => {
        setPopupMessage({})
    }


    return (
        <>
            <form  onSubmit={handleFormSubmit}
                  className={`${cssClasses.root} ${popupMessage.error ? cssClasses.rootError : ""}`}>

                <TextField
                    disabled={formLocked}
                    required
                    label="Email"
                    value={values.email}
                    variant="filled"
                    fullWidth
                    onChange={handleChange("email")}
                    placeholder={"Enter your email"}
                    autoComplete={"email"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <FilledInput
                        disabled={formLocked}
                        required
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        placeholder="Enter your password"
                        onChange={handleChange('password')}
                        autoComplete={"current-password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button className={cssClasses.submitButton}
                        variant={"contained"}
                        color={"primary"}
                        fullWidth
                        disabled={formLocked}
                        type={"submit"}>Login</Button>


            </form>

            <AlertMessage show={popupMessage.error || popupMessage.success }
                          severity={popupMessage.error?"error": undefined }
                          onClose={handlerErrorPopupClose} >
                {popupMessage.error || popupMessage.success}
            </AlertMessage>
        </>
    );
}

export default LoginForm;