"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserUpdatePassword = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _SetPageTitle = require("../SetPageTitle");
var _auth = require("firebase/auth");
var _Fireact = require("../Fireact");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UserUpdatePassword = () => {
  const [password, setPassword] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)(null);
  const [success, setSuccess] = (0, _react.useState)(false);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const title = "Change Password";
  const navigate = (0, _reactRouterDom.useNavigate)();
  const auth = (0, _auth.getAuth)();
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  return /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "md"
  }, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: title
  }), /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "h1",
    variant: "h4",
    align: "center"
  }, title)), error !== null && /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, error)), success && /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, "Your password has been updated successfully.")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "New Password",
    autoComplete: "new-password",
    type: "password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    color: "secondary",
    variant: "outlined",
    disabled: processing,
    onClick: () => {
      navigate(pathnames.UserProfile);
    }
  }, "Back")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    variant: "contained",
    disabled: processing,
    onClick: () => {
      const passwordNumericRegex = /\d+/;
      const passwordUppercaseRegex = /[A-Z]+/;
      const passwordLowercaseRegex = /[a-z]+/;
      const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
      setProcessing(true);
      setSuccess(false);
      setError(null);
      if (!passwordNumericRegex.test(String(password)) || !passwordUppercaseRegex.test(String(password)) || !passwordLowercaseRegex.test(String(password)) || !passwordSpecialRegex.test(String(password)) || password.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else {
        (0, _auth.updatePassword)(auth.currentUser, password).then(() => {
          setSuccess(true);
          setProcessing(false);
        }).catch(error => {
          switch (error.code) {
            case "auth/requires-recent-login":
              setError("This operation is sensitive and requires recent authentication. Log in again before retrying this request.");
              break;
            default:
              setError(error.message);
              break;
          }
          setProcessing(false);
        });
      }
    }
  }, "Save"))))));
};
exports.UserUpdatePassword = UserUpdatePassword;