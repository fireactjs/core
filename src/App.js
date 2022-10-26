import logo from './logo.svg';
import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider, AuthRoutes, PublicTemplate, SignIn } from './lib';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

const Logo = ({size="64"}) => {
	return (
		<img src={logo} className="App-logo" alt="logo" width={size} />
	)
}

function App() {
	return (
		<AuthProvider firebaseConfig={firebaseJson.config}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoutes signInPath="/sign-in" />} >
						<Route path="/" element={<div>signed in</div>} />
					</Route>
					<Route element={<PublicTemplate />}>
						<Route path="/sign-in" element={<SignIn logo={<Logo size={256} />} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
