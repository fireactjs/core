import './App.css';
import firebaseJson from "./firebase.json";
import { AuthProvider, AuthRoutes, PublicTemplate, SignIn } from './lib';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Logo = ({size}) => {
	return (
		<LocalFireDepartmentIcon color="warning" fontSize={size} />
	)
}

function App() {
	const ssoProviders = {
		google: true,
		facebook: true,
		microsoft: true,
		apple: true,
		twitter: true,
		github: true
	}

	return (
		<AuthProvider firebaseConfig={firebaseJson.config}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoutes signInPath="/sign-in" />} >
						<Route path="/" element={<div>signed in</div>} />
					</Route>
					<Route element={<PublicTemplate />}>
						<Route path="/sign-in" element={
							<SignIn
								logo={<Logo size="large" />}
								providers={ssoProviders}
							/>
						} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
