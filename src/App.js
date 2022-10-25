import logo from './logo.svg';
import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider, AuthRoutes } from './lib';
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
	return (
		<AuthProvider firebaseConfig={firebaseJson.config}>
			<Router>
				<Routes>
					<Route path="/sign-in" />
					<Route path="/" element={<AuthRoutes signInPath="/sign-in" />} >
						<Route path="/" element={<div>signed in</div>} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App;
