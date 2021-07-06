import { useState, useEffect } from "react";
import { Button, Grid, Box, Link } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

import getSnackbarOptions from "../util/getSnackbarOptions";
import firebase, { auth } from "../services/firebase";
import PasswordTextField from "../components/PasswordTextField";
import { useNonInitialEffect } from "../util/useNonInitialEffect";
import NormalTextField from "../components/NormalTextField";

const LoginScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailErrorText, setEmailErrorText] = useState<string>("");
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

	useNonInitialEffect(() => setEmailError(false), [email]);
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
							<NormalTextField
								label="Email"
								type="Email"
								error={emailError}
								errorText={emailErrorText}
								onChange={e => setEmail(e.target.value)}
								onSubmit={handleLogin}
							/>
						</Grid>
						<Grid item>
							<PasswordTextField label="Password" onChange={e => setPassword(e.target.value)} onSubmit={handleLogin} />
						</Grid>
						<Grid container justify="flex-end" alignItems="flex-end">
							<span style={{ marginRight: "16px" }}>
								Don't have an account? <Link href="/signup">Sign up!</Link>
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

export default LoginScreen;
