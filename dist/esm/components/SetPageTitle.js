import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth";
export const SetPageTitle = _ref => {
  let {
    title
  } = _ref;
  const {
    brand
  } = useContext(AuthContext);
  useEffect(() => {
    document.title = brand ? "".concat(title, " - ").concat(brand) : title;
  }, [title, brand]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};