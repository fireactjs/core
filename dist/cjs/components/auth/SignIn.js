function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.url.js";
import "core-js/modules/web.url-search-params.js";
import "core-js/modules/es.symbol.description.js";
import { Alert, Button, Box, Container, Grid, Stack, TextField, Typography, Link } from "@mui/material";
import React, { useContext, useState } from "react";
import googleSvg from "../../assets/images/google.svg";
import microsoftSvg from "../../assets/images/microsoft.svg";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AuthContext } from "../Auth";
import { getAuth, signInWithPopup, fetchSignInMethodsForEmail, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { FireactContext } from "../Fireact";
export const SignIn = _ref => {
  let {
    logo,
    successUrl
  } = _ref;
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  const providers = config.authProviders;
  const signUpUrl = pathnames.SignUp;
  const resetPasswordUrl = pathnames.ResetPassword;
  const btWidth = "220px";
  const title = "Sign In";
  const {
    setAuthUser
  } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = new URL(document.location).searchParams;
  const re = params.get('re') || successUrl || "/"; // redirect to parameter "re", successUrl or homepage after sign in

  const singleSignOn = providerName => {
    setProcessing(true);
    setError(null);
    let provider = null;
    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
      case "apple":
        provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        break;
      case "microsoft":
        provider = new OAuthProvider('microsoft.com');
        break;
      case "twitter":
        provider = new TwitterAuthProvider();
        break;
      default:
        break;
    }
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      setAuthUser(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        user: {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        }
      }));
      document.location.href = re.substr(0, 1) === '/' && re.substr(1, 1) !== '/' ? re : '/';
    }).catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        fetchSignInMethodsForEmail(auth, error.customData.email).then(methods => {
          setError("Please use another sign-in method: " + methods[0]);
        }).catch(error => {
          setError(error.message);
        });
      } else {
        setError(error.message);
      }
      setProcessing(false);
    });
  };
  return /*#__PURE__*/React.createElement(Container, {
    component: "main",
    maxWidth: "s"
  }, /*#__PURE__*/React.createElement(SetPageTitle, {
    title: title
  }), /*#__PURE__*/React.createElement(Box, null, logo, /*#__PURE__*/React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, title)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Stack, {
    spacing: 2,
    mt: 2
  }, error !== null && /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, error), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    startIcon: /*#__PURE__*/React.createElement(EmailIcon, null),
    disabled: processing,
    onClick: () => {
      setError(null);
      setProcessing(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).then(result => {
        const user = result.user;
        setAuthUser(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          user: {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL
          }
        }));
        document.location.href = re.substr(0, 1) === '/' && re.substr(1, 1) !== '/' ? re : '/';
      }).catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("The email address is badly formatted.");
            break;
          case "auth/internal-error":
            if (password === "") {
              setError("The password is empty.");
            } else {
              setError("An internal AuthError has occurred.");
            }
            break;
          case "auth/wrong-password":
            setError("The password is invalid or the user does not have a password.");
            break;
          case "auth/user-not-found":
            setError("There is no user record corresponding to this identifier. The user may have been deleted.");
            break;
          default:
            setError(error.message);
            break;
        }
        setProcessing(false);
      });
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Email")), (signUpUrl || resetPasswordUrl) && /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, signUpUrl && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/React.createElement(Link, {
    to: signUpUrl,
    component: RouterLink
  }, "Sign up a new account")), resetPasswordUrl && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    textAlign: "left"
  }, /*#__PURE__*/React.createElement(Link, {
    to: resetPasswordUrl,
    component: RouterLink
  }, "Reset password"))), providers && /*#__PURE__*/React.createElement(Typography, null, "OR"), providers && providers.google && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement("img", {
      src: googleSvg,
      width: "16",
      alt: "Google"
    }),
    size: "large",
    onClick: () => singleSignOn("google"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Google")), providers && providers.facebook && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement(FacebookIcon, {
      style: {
        color: "#4267B2"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("facebook"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Facebook")), providers && providers.microsoft && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement("img", {
      src: microsoftSvg,
      width: "16",
      alt: "Microsoft"
    }),
    size: "large",
    onClick: () => singleSignOn("microsoft"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Microsoft")), providers && providers.apple && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement(AppleIcon, {
      style: {
        color: "#555555"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("apple"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Apple")), providers && providers.twitter && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement(TwitterIcon, {
      style: {
        color: "#1DA1F2"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("twitter"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Twitter")), providers && providers.github && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/React.createElement(GitHubIcon, {
      style: {
        color: "#000000"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("github"),
    disabled: processing
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Github")))));
};