import { useState, useEffect } from "react";
import { Button, Grid, Box, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

import getSnackbarOptions from "../util/getSnackbarOptions";
import firebase, { auth } from "../services/firebase";
import PasswordTextField from "../components/PasswordTextField";

const LoginScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailErrorText, setEmailErrorText] = useState<string>("");
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleLogin = () => {
		if (email.length === 0 || password.length === 0) return;

		auth.signInWithEmailAndPassword(email, password)
			.then(() => setUserLoggedIn(true))
			.catch((error: firebase.auth.AuthError) => {
				if (!error.message.includes("password") && error.message.includes("email")) {
					setEmailErrorText(error.message);
					setEmailError(true);
				} else enqueueSnackbar("Invalid email or password", getSnackbarOptions(closeSnackbar));
			});
	};

	useEffect(() => auth.onAuthStateChanged(user => (user ? setUserLoggedIn(true) : null)), []);
	if (userLoggedIn) return <Redirect to="/home"></Redirect>;

	return (
		<div>
			<Grid container alignItems="center" justify="center" spacing={0} style={{ height: "100vh", backgroundColor: "rgb(200,200,200)" }}>
				<Box minWidth="500px" boxShadow={3} style={{ borderRadius: "8px", backgroundColor: "#fff" }} padding="64px 32px">
					<Grid container spacing={3} direction="column">
						<Grid container justify="center">
							<span style={{ fontSize: "30px" }}>Login</span>
						</Grid>
						<br />
						<Grid item>
							<TextField
								{...(emailError ? { error: true } : {})}
								helperText={emailError ? emailErrorText : ""}
								variant="outlined"
								label="Email"
								type="Email"
								fullWidth
								required
								onChange={e => {
									const _email: string = e.target.value;
									setEmail(_email);
									if (_email.length === 0 && !emailError) {
										setEmailError(true);
										setEmailErrorText("Please provide a email");
									} else if (_email.length !== 0 && emailError) setEmailError(false);
								}}
								onKeyPress={e => (e.key === "Enter" ? handleLogin() : null)}
							/>
						</Grid>
						<Grid item>
							<PasswordTextField
								onChange={e => {
									const _password: string = e.target.value;
									setPassword(_password);
									if (_password.length === 0 && !passwordError) setPasswordError(true);
									else if (_password.length !== 0 && passwordError) setPasswordError(false);
								}}
								onKeyPress={e => (e.key === "Enter" ? handleLogin() : null)}
								errorText={passwordError ? "Please provide a password" : ""}
								error={passwordError}
							/>
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" disableElevation fullWidth onClick={handleLogin}>
								Login
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</div>
	);
};

export default LoginScreen;
