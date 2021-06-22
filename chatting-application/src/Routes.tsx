import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Home from "./home";
import LoginScreen from "./views/LoginScreen";
import SplashScreen from "./views/SplashScreen";

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				{/* Here something that is common to all the pages like the nav bar or the footer goes */}
				<Switch>
					<Route exact path="/" component={SplashScreen}></Route>
					<Route exact path="/login" component={LoginScreen}></Route>
					<Route path="/home" exact component={Home} />
				</Switch>
				<div>footer</div>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
