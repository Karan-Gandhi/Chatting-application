import ReactDOM from "react-dom";
import "./styles/Theme.css";
import Routes from "./Routes";

ReactDOM.render(
	<Routes />,
	// <SplashScreen
	// 	loadingAction={
	// 		new Promise<() => JSX.ELement)>(resolve => {
	// 			const success: boolean = false;
	// 			// resolve();
	// 		})
	// 	}
	// 	WrappedComponent={Routes}
	// />,
	document.getElementById("root")
);
