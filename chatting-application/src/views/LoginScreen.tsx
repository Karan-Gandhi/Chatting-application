import React, { useState } from "react";

import firebase from "firebase/app";
import { firebaseConfig } from "../keys/firebaseConfig";

const LoginScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return <div></div>;
};

export default LoginScreen;
