import { useEffect, useState } from "react";
import { Box, Button, Grid, Link, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

import { useNonInitialEffect } from "../util/useNonInitialEffect";
import PasswordTextField from "../components/PasswordTextField";
import firebase, { auth } from "../services/firebase";
import getSnackbarOptions from "../util/getSnackbarOptions";

const SignupScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
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

	useNonInitialEffect(() => {
		if (email.length === 0 && !emailError) {
			setEmailError(true);
			setEmailErrorText("Please provide a email");
		} else if (email.length !== 0 && emailError) setEmailError(false);
	}, [email]);

	useNonInitialEffect(() => {
		if (password.length === 0 && !passwordError) setPasswordError(true);
		else if (password.length !== 0 && passwordError) setPasswordError(false);
	}, [password]);

	useEffect(() => auth.onAuthStateChanged(user => (user ? setUserLoggedIn(true) : null)), []);
	if (userLoggedIn) return <Redirect to="/home"></Redirect>;

	return (
		<div>
			<Grid container alignItems="center" justify="center" spacing={0} style={{ height: "100vh", backgroundColor: "rgb(200,200,200)" }}>
				<Box minWidth="500px" boxShadow={3} style={{ borderRadius: "8px", backgroundColor: "#fff" }} padding="64px 32px">
					<Grid container spacing={3} direction="column">
						<Grid container justify="center">
							<span style={{ fontSize: "30px" }}>Sign up</span>
						</Grid>
						<br />
						<Grid item>
							<TextField
								fullWidth
								required
								error={emailError}
								helperText={emailError ? emailErrorText : ""}
								variant="outlined"
								label="Email"
								type="Email"
								onChange={e => setEmail(e.target.value)}
								onKeyPress={e => (e.key === "Enter" ? handleLogin() : null)}
							/>
						</Grid>
						{/* <Grid item>
							<PasswordTextField
								label="Passowrd"
								onChange={e => setPassword(e.target.value)}
								onSubmit={handleLogin}
								errorText={passwordError ? "Please provide a password" : ""}
								error={passwordError}
							/>
						</Grid>
						<Grid item>
							<PasswordTextField
								label="Confirm Passowrd"
								onChange={e => setPassword(e.target.value)}
								onSubmit={handleLogin}
								errorText={passwordError ? "Please provide a password" : ""}
								error={passwordError}
							/>
						</Grid> */}
						<Grid container justify="flex-end" alignItems="flex-end">
							<span style={{ marginRight: "16px" }}>
								Don't have a account? <Link href="/signup">Sign up!</Link>
							</span>
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

export default SignupScreen;
