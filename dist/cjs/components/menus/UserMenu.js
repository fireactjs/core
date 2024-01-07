"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMenu = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Auth = require("../Auth");
var _AccountBox = _interopRequireDefault(require("@mui/icons-material/AccountBox"));
var _ExitToApp = _interopRequireDefault(require("@mui/icons-material/ExitToApp"));
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
var _Fireact = require("../Fireact");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UserMenu = _ref => {
  let {
    customItems
  } = _ref;
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  const profileUrl = pathnames.UserProfile;
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = (0, _reactRouterDom.useNavigate)();
  return /*#__PURE__*/_react.default.createElement(_Auth.AuthContext.Consumer, null, context => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    "ria-label": "account of current user",
    "aria-controls": "menu-appbar",
    onClick: handleMenu,
    "aria-haspopup": "true"
  }, /*#__PURE__*/_react.default.createElement(_material.Avatar, {
    alt: context.authUser.user.displayName,
    src: context.authUser.user.photoURL ? context.authUser.user.photoURL : "https://ui-avatars.com/api/?name=" + encodeURI(context.authUser.user.displayName) + "&background=007bff&size=64&color=f8f9fc"
  })), /*#__PURE__*/_react.default.createElement(_material.Menu, {
    id: "menu-appbar",
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: open,
    onClose: handleClose
  }, profileUrl && [/*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: "profile-menu-item",
    onClick: e => {
      e.preventDefault();
      handleClose();
      navigate(profileUrl);
    }
  }, /*#__PURE__*/_react.default.createElement(_AccountBox.default, {
    sx: {
      marginRight: "10px"
    }
  }), " Profile"), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    key: "profile-menu-divider"
  })], customItems, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    onClick: e => {
      e.preventDefault();
      handleClose();
      const auth = (0, _auth.getAuth)();
      (0, _auth.signOut)(auth).then(() => {
        document.location.href = "/";
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_ExitToApp.default, {
    sx: {
      marginRight: "10px"
    }
  }), " Sign Out"))));
};
exports.UserMenu = UserMenu;