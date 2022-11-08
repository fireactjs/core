"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUp = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
var _SetPageTitle = require("../SetPageTitle");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SignUp = _ref => {
  let {
    logo,
    successUrl,
    pathnames
  } = _ref;
  const title = "Sign Up";
  const signInUrl = pathnames.SignIn;
  const resetPasswordUrl = pathnames.ResetPassword;
  const re = successUrl || "/"; // redirect successUrl or homepage after sign in

  const [error, setError] = (0, _react.useState)(null);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [email, setEmail] = (0, _react.useState)("");
  const [fullname, setFullname] = (0, _react.useState)("");
  const [password, setPassword] = (0, _react.useState)("");
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: title
  }), logo, /*#__PURE__*/_react.default.createElement(_material.Typography, {
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
    name: "fullname",
    label: "Full Name",
    autoComplete: "name",
    type: "text",
    margin: "normal",
    onChange: e => setFullname(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "New Password",
    autoComplete: "new-password",
    type: "password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setError(null);
      const passwordNumericRegex = /\d+/;
      const passwordUppercaseRegex = /[A-Z]+/;
      const passwordLowercaseRegex = /[a-z]+/;
      const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
      if (fullname.trim() === "") {
        setError('Your full name is required.');
        setProcessing(false);
      } else if (!passwordNumericRegex.test(String(password)) || !passwordUppercaseRegex.test(String(password)) || !passwordLowercaseRegex.test(String(password)) || !passwordSpecialRegex.test(String(password)) || password.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else {
        ;
        const auth = (0, _auth.getAuth)();
        (0, _auth.createUserWithEmailAndPassword)(auth, email, password).then(result => {
          return (0, _auth.updateProfile)(result.user, {
            displayName: fullname
          });
        }).then(() => {
          document.location.href = re.substr(0, 1) === '/' && re.substr(1, 1) !== '/' ? re : '/';
        }).catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              setError('The email address is badly formatted.');
              break;
            case "auth/missing-email":
              setError('The email address is missing.');
              break;
            case "auth/email-already-in-use":
              setError('The email address is already in use by another account.');
              break;
            default:
              setError(error.message);
              break;
          }
          setProcessing(false);
        });
      }
    }
  }, "Sign Up"), (signInUrl || resetPasswordUrl) && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, signInUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.Link, {
    to: signInUrl,
    component: _reactRouterDom.Link
  }, "Sign in with an existing account")), resetPasswordUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    textAlign: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.Link, {
    to: resetPasswordUrl,
    component: _reactRouterDom.Link
  }, "Reset password"))))));
};
exports.SignUp = SignUp;