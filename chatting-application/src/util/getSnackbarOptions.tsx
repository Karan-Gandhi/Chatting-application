import { Button } from "@material-ui/core";
import { OptionsObject } from "notistack";

const getSnackbarOptions = (closeSnackbar: (key: string) => void): OptionsObject => {
	return {
		variant: "default",
		action: (key: string) => (
			<Button variant="text" style={{ color: "white" }} onClick={() => closeSnackbar(key)}>
				close
			</Button>
		),
	};
};

export default getSnackbarOptions;
