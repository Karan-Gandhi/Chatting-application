import React, { useEffect, useState } from "react";
import Button, { ButtonType } from "../components/Button";
import { auth } from "../util/firebase";

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

	return (
		<div>
			<Button onClick={() => {}} label="Hello world" type={ButtonType.Contained} />
		</div>
	);
};

export default SplashScreen;
