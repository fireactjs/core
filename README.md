## What is fireactjs-core?

fireactjs-core is the core package for building web applications with Firebase and Reactjs in a simple and fast approach. Its key features include:

- Built-in Firebase authentication features for users to sign up and sign in
- Built-in user profile features for users to change email, and password and delete user accounts
- Template base design for easy customization
- Component base architecture that supports full customization
- Easy to extend additional features

## Live demo

To experience the package, go to [https://demo.fireactjs.com](https://demo.fireactjs.com)

## Installation

To install the fireactjs-core components, create your Reactjs project first, and then run `npm I @fireactjs/core` to install the components.

```jsx
npx create-react-app my-app
cd my-app
npm i @fireactjs/core @mui/material @emotion/react @emotion/styled
```

For details on how to create a Reactjs application, please see [https://reactjs.org/docs/create-a-new-react-app.html](https://reactjs.org/docs/create-a-new-react-app.html)

## Setup your Firebase project

As @fireactjs/core is built on Firebase and Reactjs, you will need to have a Firebase project. Go to [the Firebase website](https://firebase.google.com/) and create a project.

### Create a web app

In your Firebase Project settings → General, click the “Add app” button to create a new web app. You will the instructions on install the firebase npm package and a JSON configuration named `firebaseConfig` which you will need to configure your @fireactjs application.

Create a file called `firebaseConfig.json` in the `/src` folder and copy the `firebaseConfig` JSON to the file similar to the format below.

```json
{
    "apiKey": "...",
    "authDomain": "...",
    "projectId": "...",
    "storageBucket": "...",
    "messagingSenderId": "...",
    "appId": "..."
}
```

### Enable authentication methods

After you create your Firebase project, go to the project console and enable the authentication methods you plan to use for your web application. @fireactjs/core supports the following authentication methods:

- Email and password
- Google
- Facebook
- Microsoft
- Twitter
- Github
- Apple

Some of the authentication methods require you to register your web application in the authentication platforms (e.g. Facebook). Please make sure you complete the necessary steps to enable the authentication methods.

Create a file called `authMethods.json` in the `/src` folder and copy the following JSON to the file, then set the authentication methods that you enabled to `true` otherwise to `false`.

```json
{
	"google": true,
	"facebook": true,
	"microsoft": true,
	"apple": true,
	"twitter": true,
	"github": true
}
```

### Initialize your Firebase project

Run `firebase login` to sign in to your Firebase account and then run `firebase init` to initialize your Firebase project locally.

### Update Firestore rules

Update your `firebase.rules` with the code below.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    match /users/{userId} {
      allow read, update, create: if request.auth.uid == userId;
    }
  }
}
```

## Modify App.js

Replace the code in your `src/App.js` with the code below. You can copy the code from [https://github.com/fireactjs/core-demo/blob/main/src/App.js](https://github.com/fireactjs/core-demo/blob/main/src/App.js)

```jsx
import './App.css';
import firebaseConfig from "./firebaseConfig.json";
import { pathnames, AppTemplate, AuthProvider, AuthRoutes, MainMenu, PublicTemplate, ResetPassword, SignIn, SignUp, UserMenu, UserProfile, UserUpdateEmail, UserUpdateName, UserUpdatePassword, UserDelete } from '@fireactjs/core';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { CircularProgress, Box } from '@mui/material';
import authMethods from "./authMethods.json";

// replace the Brand with your brand
const Brand = "FIREACT";

// replace the Logo component with your Logo component
const Logo = ({size, color}) => {
	const logoColor = color || 'warning';
	return (
		<LocalFireDepartmentIcon color={logoColor} fontSize={size} />
	);
}

const Loader = ({size}) => {
	let cpSize = "35px";
	switch(size){
		case "small":
			cpSize = "30px";
			break;
		case "medium":
			cpSize = "35px";
			break;
		case "large":
			cpSize = "45px";
			break;
		default:
			cpSize = "35px";
			break;
	}
	return (
		<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
			<CircularProgress color="warning" size={cpSize} />
			<div style={{position: "absolute" }}>
				<Logo size={size} />
			</div>
		</Box>
	);
}

	return (
		<AuthProvider firebaseConfig={firebaseConfig} brand={Brand}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoutes signInPath={pathnames.SignIn} loader={<Loader size="large" />} />} >
						<Route element={<AppTemplate logo={<Logo size="large" />} brand={Brand} toolBarMenu={<UserMenu pathnames={pathnames} />} drawerMenu={<MainMenu pathnames={pathnames}  />} />}>
							<Route exact path="/" element={<></>} />
							<Route exact path={pathnames.UserProfile} element={<UserProfile pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdateEmail} element={<UserUpdateEmail pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdateName} element={<UserUpdateName pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdatePassword} element={<UserUpdatePassword pathnames={pathnames} />} />
							<Route exact path={pathnames.UserDelete} element={<UserDelete pathnames={pathnames} />} />
						</Route>
					</Route>
					<Route element={<PublicTemplate />}>
						<Route path={pathnames.SignIn} element={
							<SignIn
								logo={<Logo size="large" />}
								pathnames={pathnames}
								providers={authMethods}
							/>
						} />
						<Route path={pathnames.SignUp} element={
							<SignUp
								logo={<Logo size="large" />}
								pathnames={pathnames}
							/>
						} />
						<Route path={pathnames.ResetPassword} element={
							<ResetPassword
								logo={<Logo size="large" />}
								pathnames={pathnames}
							/>
						} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
```

Replace `Brand` and `Logo` to customise the logo and the brand of your web application.

For further customisation, please read the documentation.

## Run your app locally

By now, your app is ready for the first run locally. Use the command `npm start` to start the app.

## Deploy to Firebase

After testing locally, your app is ready to be deployed to Firebase hosting.

### Build

Run `npm run build` to build your app

### Deploy

Run `firebase init` to initialize your project with Firebase and then run `firebase deploy` to deploy your app to Firebase. If you see a blank screen in your production URL, make sure you set the `build` as the folder in your Firebase settings.