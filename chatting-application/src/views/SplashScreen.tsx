import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";

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

	useEffect(() => {
		// do some authentication stuff
		const success: boolean = false;
		console.log(auth);
	}, []);

	return <div>loading</div>;
};

export default SplashScreen;
