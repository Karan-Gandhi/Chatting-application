import { useEffect, useState } from "react";
import { Box, Button, Grid, Link } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

import { useNonInitialEffect } from "../util/useNonInitialEffect";
import PasswordTextField from "../components/PasswordTextField";
import firebase, { auth } from "../services/firebase";
import getSnackbarOptions from "../util/getSnackbarOptions";
import NormalTextField from "../components/NormalTextField";

const SignupScreen = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailErrorText, setEmailErrorText] = useState<string>("");
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleSignup = () => {
		if (email.length === 0 || password.length === 0) return;
		if (password !== confirmPassword) enqueueSnackbar("The given passwords don't match", getSnackbarOptions(closeSnackbar));

		auth.createUserWithEmailAndPassword(email, password)
			.then(() => setUserLoggedIn(true))
			.catch((error: firebase.auth.AuthError) => {
				if (!error.message.includes("password") && error.message.includes("email")) {
					setEmailErrorText(error.message);
					setEmailError(true);
				} else enqueueSnackbar("Invalid email or password", getSnackbarOptions(closeSnackbar));
			});
	};

	useNonInitialEffect(() => setEmailError(false), [email]);
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
							<NormalTextField label="Name" type="Email" onChange={e => setName(e.target.value)} onSubmit={handleSignup} />
						</Grid>
						<Grid item>
							<NormalTextField
								label="Email"
								type="text"
								error={emailError}
								errorText={emailErrorText}
								onChange={e => setEmail(e.target.value)}
								onSubmit={handleSignup}
							/>
						</Grid>
						<Grid item>
							<PasswordTextField label="Password" onChange={e => setPassword(e.target.value)} onSubmit={handleSignup} />
						</Grid>
						<Grid item>
							<PasswordTextField label="Confirm password" onChange={e => setConfirmPassword(e.target.value)} onSubmit={handleSignup} />
						</Grid>
						<Grid container justify="flex-end" alignItems="flex-end">
							<span style={{ marginRight: "16px" }}>
								Already have an account? <Link href="/signup">Log in!</Link>
							</span>
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" disableElevation fullWidth onClick={handleSignup}>
								Sign up
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</div>
	);
};

export default SignupScreen;
