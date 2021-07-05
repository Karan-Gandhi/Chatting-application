import React from "react";
import { auth } from "./services/firebase";

const Home = () => {
	auth.signOut().then(() => console.log("user signed out"));
	return <div>Home</div>;
};

export default Home;
