function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.symbol.description.js";
import React, { useEffect, useState, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FireactContext } from "./Fireact";
import { getFunctions } from "firebase/functions";
export const AuthContext = /*#__PURE__*/React.createContext();
export const AuthProvider = _ref => {
  let {
    children
  } = _ref;
  // authorized user state
  const [authUser, setAuthUser] = useState({
    user: null,
    data: {},
    checked: false
  });
  const {
    config
  } = useContext(FireactContext);
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [authInstance, setAuthInstance] = useState(null);
  const [firestoreInstance, setFirestoreInstance] = useState(null);
  const [functionsInstance, setFunctionsInstance] = useState(null);
  useEffect(() => {
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const functions = getFunctions(app);
    setFirebaseApp(app);
    setAuthInstance(auth);
    setFirestoreInstance(firestore);
    setFunctionsInstance(functions);
    onAuthStateChanged(auth, user => {
      if (user !== null) {
        user.getIdToken().then(token => {
          const userDoc = doc(firestore, 'users', user.uid);
          setAuthUser(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
            user: user,
            checked: true
          }));
          setDoc(userDoc, {
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
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
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
export const AuthRoutes = _ref2 => {
  let {
    loader
  } = _ref2;
  const {
    authUser
  } = useContext(AuthContext);
  const {
    config
  } = useContext(FireactContext);
  const signInPath = config.pathnames.SignIn;
  if (authUser.checked) {
    if (authUser.user !== null) {
      return /*#__PURE__*/React.createElement(Outlet, null);
    } else {
      return /*#__PURE__*/React.createElement(Navigate, {
        to: signInPath + "?re=" + document.location.pathname + document.location.search + document.location.hash
      });
    }
  } else {
    return /*#__PURE__*/React.createElement(Box, {
      mt: 10
    }, /*#__PURE__*/React.createElement(Container, {
      maxWidth: "sm"
    }, /*#__PURE__*/React.createElement(Box, {
      component: "span",
      m: 5,
      textAlign: "center"
    }, loader)));
  }
};