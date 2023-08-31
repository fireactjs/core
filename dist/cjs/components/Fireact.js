import React from "react";
export const FireactContext = /*#__PURE__*/React.createContext();
export const FireactProvider = _ref => {
  let {
    config,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(FireactContext.Provider, {
    value: {
      config
    }
  }, children);
};