import logo from './logo.svg';
import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider, AuthRoutes, PublicTemplate } from './lib';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
	return (
		<AuthProvider firebaseConfig={firebaseJson.config}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoutes signInPath="/sign-in" />} >
						<Route path="/" element={<div>signed in</div>} />
					</Route>
					<Route element={<PublicTemplate />}>
						<Route path="/sign-in" element={<div>sign in form</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
