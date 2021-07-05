import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";

import PasswordTextFieldProps from "../util/PasswordTextFieldProps";

const PasswordTextField = (props: PasswordTextFieldProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<TextField
			onChange={props.onChange}
			onKeyPress={e => (e.key === "Enter" && props.onSubmit ? props.onSubmit(e) : null)}
			error={props.error}
			helperText={props.errorText}
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
	);
};

export default PasswordTextField;
