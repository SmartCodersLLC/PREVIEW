//goto top button
// Language: javascript
// Path: UMK_Front\src\Components\topButton.js

import React from "react";

export default function TRWrapper({ children, index }) {
    // console.log("trWrapper", index);
  if (index == 0) return <> {children} </>;
  return <tr> {children} </tr>;
}
