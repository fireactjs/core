"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppTemplate = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _material = require("@mui/material");
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
var _ChevronLeft = _interopRequireDefault(require("@mui/icons-material/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("@mui/icons-material/ChevronRight"));
var _reactRouterDom = require("react-router-dom");
var _Fireact = require("../Fireact");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const drawerWidth = 240;
const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});
const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: "calc(".concat(theme.spacing(7), " + 1px)"),
  [theme.breakpoints.up('sm')]: {
    width: "calc(".concat(theme.spacing(9), " + 1px)")
  }
});
const DrawerHeader = (0, _styles.styled)('div')(_ref => {
  let {
    theme
  } = _ref;
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1)
  }, theme.mixins.toolbar);
});
const AppBar = (0, _styles.styled)(_material.AppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(_ref2 => {
  let {
    theme,
    open
  } = _ref2;
  return _objectSpread({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }, open && {
    marginLeft: drawerWidth,
    width: "calc(100% - ".concat(drawerWidth, "px)"),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  });
});
const Drawer = (0, _styles.styled)(_material.Drawer, {
  shouldForwardProp: prop => prop !== 'open'
})(_ref3 => {
  let {
    theme,
    open
  } = _ref3;
  return _objectSpread(_objectSpread({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box'
  }, open && _objectSpread(_objectSpread({}, openedMixin(theme)), {}, {
    '& .MuiDrawer-paper': openedMixin(theme)
  })), !open && _objectSpread(_objectSpread({}, closedMixin(theme)), {}, {
    '& .MuiDrawer-paper': closedMixin(theme)
  }));
});
const AppTemplate = _ref4 => {
  let {
    logo,
    drawerMenu,
    toolbarChildren,
    toolBarMenu
  } = _ref4;
  const theme = (0, _styles.useTheme)();
  const [open, setOpen] = (0, _react.useState)(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const brand = config.brand;
  const navigate = (0, _reactRouterDom.useNavigate)();
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CssBaseline, null), /*#__PURE__*/_react.default.createElement(AppBar, {
    position: "fixed",
    open: open
  }, /*#__PURE__*/_react.default.createElement(_material.Toolbar, null, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    onClick: handleDrawerOpen,
    edge: "start",
    sx: _objectSpread({
      marginRight: '36px'
    }, open && {
      display: 'none'
    })
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, null)), toolbarChildren, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: "auto",
      marginRight: "0px"
    }
  }, toolBarMenu))), /*#__PURE__*/_react.default.createElement(Drawer, {
    variant: "permanent",
    open: open
  }, /*#__PURE__*/_react.default.createElement(DrawerHeader, null, open && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: '0px',
      marginRight: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    style: {
      color: "#000000"
    },
    onClick: () => navigate("/")
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'inline-flex',
      paddingRight: '20px'
    }
  }, logo), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, brand))), /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: handleDrawerClose
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_ChevronRight.default, null) : /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, null))), /*#__PURE__*/_react.default.createElement(_material.Divider, null), drawerMenu, /*#__PURE__*/_react.default.createElement(_material.Divider, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "main",
    sx: {
      flexGrow: 1,
      backgroundColor: theme => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      height: '100vh',
      overflow: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(DrawerHeader, null), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    mt: 5,
    ml: 3,
    mr: 3,
    mb: 3
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null)))));
};
exports.AppTemplate = AppTemplate;