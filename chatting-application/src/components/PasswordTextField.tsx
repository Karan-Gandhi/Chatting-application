import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";

import PasswordTextFieldProps from "../util/PasswordTextFieldProps";
import { useNonInitialEffect } from "../util/useNonInitialEffect";

const PasswordTextField = (props: PasswordTextFieldProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [text, setText] = useState<string>("");

	useNonInitialEffect(() => {
		if (text.length === 0 && !passwordError) setPasswordError(true);
		else if (text.length !== 0 && passwordError) setPasswordError(false);
	}, [text]);

	return (
		<TextField
			onChange={e => {
				setText(e.target.value);
				if (props.onChange) props.onChange(e);
			}}
			onKeyPress={e => (e.key === "Enter" && props.onSubmit ? props.onSubmit(e) : null)}
			helperText={passwordError ? "Please provide a password" : ""}
			error={passwordError}
			variant="outlined"
			label={props.label}
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
	);
};

export default PasswordTextField;
