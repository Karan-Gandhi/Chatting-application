import { useState, useEffect } from "react";
import { Button, Grid, Box, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import firebase, { auth } from "../util/firebase";

const LoginScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailErrorText, setEmailErrorText] = useState<string>("");
	const [passwordError, setPasswordError] = useState<boolean>(false);

	useEffect(() => {
		// TODO: check if the user is logged in
	}, []);

	const handleLogin = () => {
		if (email.length === 0 || password.length === 0) return;

		// authenticate
		auth.signInWithEmailAndPassword(email, password)
			.then((credentials: firebase.auth.UserCredential) => {
				console.log(credentials);
			})
			.catch((error: firebase.auth.AuthError) => {
				if (!error.message.includes("password") && error.message.includes("email")) {
					setEmailErrorText(error.message);
					setEmailError(true);
				} else {
					// create a snackbar and display the error message
				}
			});
	};

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
							/>
						</Grid>
						<Grid item>
							<TextField
								onChange={e => {
									const _password: string = e.target.value;
									setPassword(_password);
									if (_password.length === 0 && !passwordError) setPasswordError(true);
									else if (_password.length !== 0 && passwordError) setPasswordError(false);
								}}
								{...(passwordError ? { error: true } : {})}
								helperText={passwordError ? "Please provide a password" : ""}
								variant="outlined"
								label="Password"
								type={showPassword ? "text" : "password"}
								fullWidth
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
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
