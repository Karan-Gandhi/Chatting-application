import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import SplashScreen from "./views/SplashScreen";
import { Redirect } from "react-router-dom";

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
