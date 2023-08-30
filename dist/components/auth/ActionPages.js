"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionPages = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _SetPageTitle = require("../SetPageTitle");
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
var _Fireact = require("../Fireact");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ActionPages = _ref => {
  let {
    logo
  } = _ref;
  let title = "Unknown Action";
  const params = new URL(document.location).searchParams;
  const mode = params.get('mode');
  const actionCode = params.get('oobCode');
  // const apiKey = params.get('apiKey');
  // const continueUrl = params.get('continueUrl');
  // const lang = params.get('lang') || 'en';

  switch (mode) {
    case 'resetPassword':
      title = "Reset Password";
      break;
    case 'recoverEmail':
      title = 'Recover Email';
      break;
    case 'verifyEmail':
      title = 'Verfiy Email';
      break;
    default:
      break;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: title
  }), logo, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "h1",
    variant: "h5"
  }, title)), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    spacing: 2,
    mt: 2
  }, (mode === 'verifyEmail' || mode === 'recoverEmail') && /*#__PURE__*/_react.default.createElement(HandleAction, {
    actionCode: actionCode,
    mode: mode
  }), mode === 'resetPassword' && /*#__PURE__*/_react.default.createElement(ResetPassword, {
    actionCode: actionCode
  }))));
};
exports.ActionPages = ActionPages;
const ResetPassword = _ref2 => {
  let {
    actionCode
  } = _ref2;
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [stage, setStage] = (0, _react.useState)('verifying');
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const [newPassword, setNewPassword] = (0, _react.useState)('');
  const [confirmPassword, setConfirmPassword] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    const auth = (0, _auth.getAuth)();
    (0, _auth.verifyPasswordResetCode)(auth, actionCode).then(() => {
      setStage('form');
    }).catch(error => {
      setStage('');
      setError(error.message);
    });
  }, [actionCode]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, error && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, error), stage === 'verifying' && /*#__PURE__*/_react.default.createElement(_material.Typography, null, "Please wait while verifying your request..."), stage === 'form' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "newPassword",
    label: "New Password",
    type: "password",
    autoComplete: "new-password",
    margin: "normal",
    onChange: e => setNewPassword(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    autoComplete: "",
    margin: "normal",
    onChange: e => setConfirmPassword(e.target.value)
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
      if (!passwordNumericRegex.test(String(newPassword)) || !passwordUppercaseRegex.test(String(newPassword)) || !passwordLowercaseRegex.test(String(newPassword)) || !passwordSpecialRegex.test(String(newPassword)) || newPassword.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else if (newPassword !== confirmPassword) {
        setError('Confirm password does not match with new password.');
        setProcessing(false);
      } else {
        const auth = (0, _auth.getAuth)();
        (0, _auth.confirmPasswordReset)(auth, actionCode, newPassword).then(() => {
          setStage('success');
        }).catch(error => {
          setError(error.message);
          setProcessing(false);
        });
      }
    }
  }, "Reset Password")), stage === 'success' && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, "Your email is verified. Please ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: config.pathnames.SignIn
  }, "sign in"), " with your new password."));
};
const HandleAction = _ref3 => {
  let {
    mode,
    actionCode
  } = _ref3;
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [success, setSuccess] = (0, _react.useState)(false);
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  let processingMessage = 'Please wait';
  let successMessage = 'Done';
  switch (mode) {
    case 'verifyEmail':
      processingMessage = 'Please wait while verifying your email...';
      successMessage = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Your email is verified. Please ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
        to: config.pathnames.SignIn
      }, "sign in"), " again.");
      break;
    case 'recoverEmail':
      processingMessage = 'Please wait while resotring your email...';
      successMessage = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Your email is restored. Please ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
        to: config.pathnames.ResetPassword
      }, "reset password"), " to ensure your account is secured.");
      break;
    default:
      break;
  }
  (0, _react.useEffect)(() => {
    setProcessing(true);
    setError(null);
    setSuccess(false);
    const auth = (0, _auth.getAuth)();
    (0, _auth.applyActionCode)(auth, actionCode).then(() => {
      setSuccess(true);
      setProcessing(false);
    }).catch(error => {
      setError(error.message);
      setProcessing(false);
    });
  }, [actionCode]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, processing ? /*#__PURE__*/_react.default.createElement(_material.Typography, null, processingMessage) : success ? /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, successMessage) : error ? /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, error) : /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, "Something went wrong"));
};