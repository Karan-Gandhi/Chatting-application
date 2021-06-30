import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./home";
import LoginScreen from "./views/LoginScreen";

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				{/* Here something that is common to all the pages like the nav bar or the footer goes */}
				<Switch>
					<Route exact path="/" component={() => <Redirect to="/login" />}></Route>
					<Route exact path="/login" component={LoginScreen}></Route>
					<Route path="/home" exact component={Home} />
				</Switch>
				<div>footer</div>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
