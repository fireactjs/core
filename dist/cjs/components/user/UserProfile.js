"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfile = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Auth = require("../Auth");
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Send = _interopRequireDefault(require("@mui/icons-material/Send"));
var _VerifiedUser = _interopRequireDefault(require("@mui/icons-material/VerifiedUser"));
var _reactRouterDom = require("react-router-dom");
var _SetPageTitle = require("../SetPageTitle");
var _auth = require("firebase/auth");
var _Fireact = require("../Fireact");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UserProfile = () => {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const auth = (0, _auth.getAuth)();
  const [sendVerification, setSendVerification] = (0, _react.useState)({
    'success': false,
    'error': null
  });
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  return /*#__PURE__*/_react.default.createElement(_Auth.AuthContext.Consumer, null, context => /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "md"
  }, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: "User Profile"
  }), /*#__PURE__*/_react.default.createElement(_material.Paper, null, sendVerification.error !== null && /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, sendVerification.error)), sendVerification.success && /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, "Please check your email inbox to verify the email address. Refresh this page after you verified your email address.")), /*#__PURE__*/_react.default.createElement(_material.List, {
    component: "nav"
  }, /*#__PURE__*/_react.default.createElement(_material.ListItem, null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement("strong", null, "AVATAR"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    color: "textSecondary"
  }, "Update via social login")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Avatar, {
    alt: context.authUser.user.displayName,
    src: context.authUser.user.photoURL ? context.authUser.user.photoURL : "https://ui-avatars.com/api/?name=" + encodeURI(context.authUser.user.displayName) + "&background=007bff&size=64&color=f8f9fc",
    style: {
      height: '64px',
      width: '64px'
    }
  })))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdateName);
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement("strong", null, "NAME"), /*#__PURE__*/_react.default.createElement("br", null), context.authUser.user.displayName)), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdateEmail);
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement("strong", null, "EMAIL"), /*#__PURE__*/_react.default.createElement("br", null), context.authUser.user.email)), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    onClick: () => {
      if (!context.authUser.user.emailVerified) {
        setSendVerification({
          'success': false,
          'error': null
        });
        (0, _auth.sendEmailVerification)(auth.currentUser).then(() => {
          setSendVerification({
            'success': true,
            'error': null
          });
        }).catch(error => {
          switch (error.code) {
            case "auth/too-many-requests":
              setSendVerification({
                'success': false,
                'error': "We have blocked all requests from this device due to unusual activity. Try again later."
              });
              break;
            default:
              setSendVerification({
                'success': false,
                'error': error.message
              });
              break;
          }
        });
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement("strong", null, "EMAIL VERIFIED"), /*#__PURE__*/_react.default.createElement("br", null), context.authUser.user.emailVerified ? " Verified" : "Unverified email")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, context.authUser.user.emailVerified ? /*#__PURE__*/_react.default.createElement(_VerifiedUser.default, null) : /*#__PURE__*/_react.default.createElement(_Send.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdatePassword);
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement("strong", null, "PASSWORD"), /*#__PURE__*/_react.default.createElement("br", null), "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserDelete);
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    item: true,
    xs: 12,
    md: 4
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    color: "error"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "DELETE ACCOUNT"))))))))));
};
exports.UserProfile = UserProfile;