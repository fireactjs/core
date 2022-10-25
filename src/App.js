import logo from './logo.svg';
import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider, AuthRoutes } from './lib';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
	return (
		<AuthProvider firebaseConfig={firebaseJson.config}>
			<BrowserRouter>
				<Routes>
					<Route path="/sign-in" />
					<Route element={<AuthRoutes signInPath="/sign-in" />} >
						<Route path="/" element={<div>signed in</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
