import React, { useState } from "react";

import { useEffect } from "react";

const LoginScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		// TODO: check if the user is logged in
	}, []);

	return <div></div>;
};

export default LoginScreen;
