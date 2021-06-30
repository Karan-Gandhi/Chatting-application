import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./home";
import LoginScreen from "./views/LoginScreen";
import { SnackbarProvider } from "notistack";

const Routes = () => {
	return (
		<SnackbarProvider maxSnack={100}>
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={() => <Redirect to="/login" />}></Route>
						<Route exact path="/login" component={LoginScreen}></Route>
						<Route path="/home" exact component={Home} />
					</Switch>
					<div>footer</div>
				</BrowserRouter>
			</div>
		</SnackbarProvider>
	);
};

export default Routes;
