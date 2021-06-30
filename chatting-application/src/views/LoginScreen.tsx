import { useState, useEffect } from "react";
import { Button, Grid, Box, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const LoginScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);

	useEffect(() => {
		// TODO: check if the user is logged in
	}, []);

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
							<TextField variant="outlined" label="Username" fullWidth required />
						</Grid>
						<Grid item>
							<TextField
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
							<Button variant="contained" color="primary" disableElevation fullWidth>
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
