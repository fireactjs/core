"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRoutes = exports.AuthProvider = exports.AuthContext = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireWildcard(require("react"));
var _app = require("firebase/app");
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _firestore = require("firebase/firestore");
var _functions = require("firebase/functions");
var _Fireact = require("./Fireact");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const AuthContext = /*#__PURE__*/_react.default.createContext();
exports.AuthContext = AuthContext;
const AuthProvider = _ref => {
  let {
    children
  } = _ref;
  // authorized user state
  const [authUser, setAuthUser] = (0, _react.useState)({
    user: null,
    data: {},
    checked: false
  });
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const firebaseApp = (0, _app.initializeApp)(config.firebaseConfig);
  const firestore = (0, _firestore.getFirestore)(firebaseApp);
  const cloudFunctions = (0, _functions.getFunctions)(firebaseApp);
  const firebaseAuth = (0, _auth.getAuth)(firebaseApp);
  console.log(firestore, Object.getPrototypeOf(firestore));
  (0, _react.useEffect)(() => {
    (0, _auth.onAuthStateChanged)(firebaseAuth, user => {
      if (user !== null) {
        user.getIdToken().then(token => {
          const userDoc = (0, _firestore.doc)(firestore, 'users', user.uid);
          setAuthUser(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
            user: user,
            checked: true
          }));
          (0, _firestore.setDoc)(userDoc, {
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email
          }, {
            merge: true
          });
        });
      } else {
        setAuthUser(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          user: null,
          checked: true
        }));
      }
    });
  }, [firebaseApp, firestore, firebaseAuth]);
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      authUser,
      setAuthUser,
      firebaseApp,
      firestore,
      cloudFunctions,
      firebaseAuth
    }
  }, children);
};
exports.AuthProvider = AuthProvider;
const AuthRoutes = _ref2 => {
  let {
    loader
  } = _ref2;
  const {
    authUser
  } = (0, _react.useContext)(AuthContext);
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const signInPath = config.pathnames.SignIn;
  if (authUser.checked) {
    if (authUser.user !== null) {
      return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null);
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
        to: signInPath + "?re=" + document.location.pathname + document.location.search + document.location.hash
      });
    }
  } else {
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      mt: 10
    }, /*#__PURE__*/_react.default.createElement(_material.Container, {
      maxWidth: "sm"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      component: "span",
      m: 5,
      textAlign: "center"
    }, loader)));
  }
};
exports.AuthRoutes = AuthRoutes;