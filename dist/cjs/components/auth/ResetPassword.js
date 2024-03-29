"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPassword = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _auth = require("firebase/auth");
var _SetPageTitle = require("../SetPageTitle");
var _Fireact = require("../Fireact");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ResetPassword = _ref => {
  let {
    logo
  } = _ref;
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  const signInUrl = pathnames.SignIn;
  const title = "Reset Password";
  const [error, setError] = (0, _react.useState)(null);
  const [success, setSuccess] = (0, _react.useState)(false);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [email, setEmail] = (0, _react.useState)("");
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
  }, error), success && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, "A password reset email has been sent to the email address."), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setSuccess(false);
      setError(null);
      const auth = (0, _auth.getAuth)();
      (0, _auth.sendPasswordResetEmail)(auth, email).then(() => {
        setProcessing(false);
        setSuccess(true);
      }).catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            setError('The email address is badly formatted.');
            break;
          case "auth/missing-email":
            setError('The email address is missing.');
            break;
          case "auth/user-not-found":
            setError('There is no user record corresponding to this identifier. The user may have been deleted.');
            break;
          case "auth/too-many-requests":
            setError('We have blocked all requests from this device due to unusual activity. Try again later.');
            break;
          default:
            setError(error.message);
            break;
        }
        setProcessing(false);
      });
    }
  }, "Reset Password"), signInUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, signInUrl && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.Link, {
    to: signInUrl,
    component: _reactRouterDom.Link
  }, "Sign in with an existing account"))))));
};
exports.ResetPassword = ResetPassword;