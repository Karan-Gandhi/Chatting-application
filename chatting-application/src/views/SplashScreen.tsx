import React, { useEffect, useState } from "react";
import { Button, Grid, Box, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { auth } from "../util/firebase";
import { Visibility, VisibilityOff } from "@material-ui/icons";

// const SplashScreen = (props: { loadingAction: Promise<() => JSX.Element>; WrappedComponent: () => JSX.Element; loadingCompleted?: () => any }) => {
// 	const [isLoading, setLoading] = useState<boolean>(true);
// 	const [WrappedELement, setWrappedElement] = useState<(() => JSX.Element) | null>(null);

// 	useEffect(() => {
// 		props.loadingAction
// 			.then(element => {
// 				setLoading(false);
// 				setWrappedElement(element);
// 			})
// 			.then(props.loadingCompleted);
// 	}, [props.loadingAction, props.loadingCompleted]);

// 	// TODO: Make a bit more fancy loading page
// 	if (isLoading) return <div>Loading</div>;
// 	else if (!isLoading && !!WrappedELement) return <WrappedELement />;
// 	else return <div></div>;
// };

const SplashScreen = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [ElementToReturn, setElementToReturn] = useState<JSX.Element>();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	useEffect(() => {
		// do some authentication stuff
		const success: boolean = false;
		console.log(auth);
	}, []);

	return <div>Loading</div>;
};

export default SplashScreen;
