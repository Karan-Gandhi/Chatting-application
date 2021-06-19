import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Home from "./home";

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				{/* Here something that is common to all the pages like the nav bar or the footer goes */}
				<div>nav bar</div>
				<Switch>
					<Route exact path="/" component={() => <App />}></Route>
					<Route path="/home" exact component={() => <Home />} />
				</Switch>
				<div>fotter</div>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
