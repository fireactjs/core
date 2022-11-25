"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url-search-params.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _google = _interopRequireDefault(require("../../assets/images/google.svg"));
var _microsoft = _interopRequireDefault(require("../../assets/images/microsoft.svg"));
var _Email = _interopRequireDefault(require("@mui/icons-material/Email"));
var _Facebook = _interopRequireDefault(require("@mui/icons-material/Facebook"));
var _Apple = _interopRequireDefault(require("@mui/icons-material/Apple"));
var _Twitter = _interopRequireDefault(require("@mui/icons-material/Twitter"));
var _GitHub = _interopRequireDefault(require("@mui/icons-material/GitHub"));
var _Auth = require("../Auth");
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
var _SetPageTitle = require("../SetPageTitle");
var _Fireact = require("../Fireact");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const SignIn = _ref => {
  let {
    logo,
    successUrl
  } = _ref;
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  const providers = config.authProviders;
  const signUpUrl = pathnames.SignUp;
  const resetPasswordUrl = pathnames.ResetPassword;
  const btWidth = "220px";
  const title = "Sign In";
  const {
    setAuthUser
  } = (0, _react.useContext)(_Auth.AuthContext);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [email, setEmail] = (0, _react.useState)("");
  const [password, setPassword] = (0, _react.useState)("");
  const params = new URL(document.location).searchParams;
  const re = params.get('re') || successUrl || "/"; // redirect to parameter "re", successUrl or homepage after sign in

  const singleSignOn = providerName => {
    setProcessing(true);
    setError(null);
    let provider = null;
    switch (providerName) {
      case "google":
        provider = new _auth.GoogleAuthProvider();
        break;
      case "facebook":
        provider = new _auth.FacebookAuthProvider();
        break;
      case "github":
        provider = new _auth.GithubAuthProvider();
        break;
      case "apple":
        provider = new _auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        break;
      case "microsoft":
        provider = new _auth.OAuthProvider('microsoft.com');
        break;
      case "twitter":
        provider = new _auth.TwitterAuthProvider();
        break;
      default:
        break;
    }
    const auth = (0, _auth.getAuth)();
    (0, _auth.signInWithPopup)(auth, provider).then(result => {
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
        (0, _auth.fetchSignInMethodsForEmail)(auth, error.customData.email).then(methods => {
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
  return /*#__PURE__*/_react.default.createElement(_material.Container, {
    component: "main",
    maxWidth: "s"
  }, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: title
  }), /*#__PURE__*/_react.default.createElement(_material.Box, null, logo, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "h1",
    variant: "h5"
  }, title)), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    spacing: 2,
    mt: 2
  }, error !== null && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, error), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    startIcon: /*#__PURE__*/_react.default.createElement(_Email.default, null),
    disabled: processing,
    onClick: () => {
      setError(null);
      setProcessing(true);
      const auth = (0, _auth.getAuth)();
      (0, _auth.signInWithEmailAndPassword)(auth, email, password).then(result => {
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
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Email")), (signUpUrl || resetPasswordUrl) && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, signUpUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.Link, {
    to: signUpUrl,
    component: _reactRouterDom.Link
  }, "Sign up a new account")), resetPasswordUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    textAlign: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.Link, {
    to: resetPasswordUrl,
    component: _reactRouterDom.Link
  }, "Reset password"))), providers && /*#__PURE__*/_react.default.createElement(_material.Typography, null, "OR"), providers && providers.google && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement("img", {
      src: _google.default,
      width: "16",
      alt: "Google"
    }),
    size: "large",
    onClick: () => singleSignOn("google"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Google")), providers && providers.facebook && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_Facebook.default, {
      style: {
        color: "#4267B2"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("facebook"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Facebook")), providers && providers.microsoft && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement("img", {
      src: _microsoft.default,
      width: "16",
      alt: "Microsoft"
    }),
    size: "large",
    onClick: () => singleSignOn("microsoft"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Microsoft")), providers && providers.apple && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_Apple.default, {
      style: {
        color: "#555555"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("apple"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Apple")), providers && providers.twitter && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_Twitter.default, {
      style: {
        color: "#1DA1F2"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("twitter"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Twitter")), providers && providers.github && /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "outlined",
    startIcon: /*#__PURE__*/_react.default.createElement(_GitHub.default, {
      style: {
        color: "#000000"
      }
    }),
    size: "large",
    onClick: () => singleSignOn("github"),
    disabled: processing
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "span",
    style: {
      width: "".concat(btWidth)
    }
  }, "Sign In With Github")))));
};
exports.SignIn = SignIn;