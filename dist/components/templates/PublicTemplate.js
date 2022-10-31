"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicTemplate = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PublicTemplate = () => {
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    mt: 10
  }, /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "sm"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "span",
    m: 5,
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null))));
};
exports.PublicTemplate = PublicTemplate;