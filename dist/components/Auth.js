"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
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
var _Fireact = require("./Fireact");
var _functions = require("firebase/functions");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  const [firebaseApp, setFirebaseApp] = (0, _react.useState)(null);
  const [authInstance, setAuthInstance] = (0, _react.useState)(null);
  const [firestoreInstance, setFirestoreInstance] = (0, _react.useState)(null);
  const [functionsInstance, setFunctionsInstance] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const app = (0, _app.initializeApp)(config.firebaseConfig);
    const auth = (0, _auth.getAuth)(app);
    const firestore = (0, _firestore.getFirestore)(app);
    const functions = (0, _functions.getFunctions)(app);
    setFirebaseApp(app);
    setAuthInstance(auth);
    setFirestoreInstance(firestore);
    setFunctionsInstance(functions);
    (0, _auth.onAuthStateChanged)(auth, user => {
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
  }, [config.firebaseConfig]);
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      authUser,
      setAuthUser,
      firebaseApp,
      authInstance,
      firestoreInstance,
      functionsInstance
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