"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireactProvider = exports.FireactContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FireactContext = /*#__PURE__*/_react.default.createContext();
exports.FireactContext = FireactContext;
const FireactProvider = _ref => {
  let {
    config,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(FireactContext.Provider, {
    value: {
      config
    }
  }, children);
};
exports.FireactProvider = FireactProvider;