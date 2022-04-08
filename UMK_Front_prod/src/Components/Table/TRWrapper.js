//goto top button
// Language: javascript
// Path: UMK_Front\src\Components\topButton.js

import React from "react";

export default function TRWrapper({ children, index, rowSpaner }) {
  if (index == 0)
    return (
      <tr>
        {rowSpaner} {children}
      </tr>
    );
  return <tr>{children}</tr>;
}
