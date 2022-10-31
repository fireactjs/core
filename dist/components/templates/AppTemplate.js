"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppTemplate = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _material = require("@mui/material");
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
var _ChevronLeft = _interopRequireDefault(require("@mui/icons-material/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("@mui/icons-material/ChevronRight"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    brand,
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'inline-flex',
      paddingRight: '20px'
    }
  }, logo), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, brand)), /*#__PURE__*/_react.default.createElement(_material.IconButton, {
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