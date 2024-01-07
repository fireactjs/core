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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const AuthContext = exports.AuthContext = /*#__PURE__*/_react.default.createContext();
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