import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useNonInitialEffect } from "../util/useNonInitialEffect";
import NormalTextFieldProps from "../util/NormalTextFieldProps";

const NormalTextField = (props: NormalTextFieldProps) => {
	const [error, setError] = useState<boolean>(props.error || false);
	const [errorText, setErrorText] = useState<string>(props.errorText || "");
	const [text, setText] = useState<string>("");

	useNonInitialEffect(() => {
		if (text.length === 0 && !error) {
			setError(true);
			setErrorText("Please provide a email");
		} else if (text.length !== 0 && error) {
			setError(props.error || false);
			setErrorText(props.errorText || "");
		}
	}, [text]);

	return (
		<TextField
			fullWidth
			required
			error={error || props.error}
			helperText={error || props.error ? errorText || props.errorText : ""}
			variant="outlined"
			label={props.label}
			type={props.type}
			onChange={e => {
				setText(e.target.value);
				if (props.onChange) props.onChange(e);
			}}
			onKeyPress={e => (e.key === "Enter" && props.onSubmit ? props.onSubmit(e) : null)}
		/>
	);
};

export default NormalTextField;
