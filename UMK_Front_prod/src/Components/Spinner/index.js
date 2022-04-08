// @src/components/Spinner/index.js

import React from "react";
import styles from "./Spinner.module.css";

const BouncingDotsLoader = (props) => {
  const width = props.size || "16px";
  const height = props.size || "16px";
  const backgroundColor = props.color || "#888";

  return (
    <div className={styles.loader}>
      <div
        className={styles.dot}
        style={{ width, height, backgroundColor }}
      ></div>
      <div
        className={styles.dot}
        style={{ width, height, backgroundColor }}
      ></div>
      <div
        className={styles.dot}
        style={{ width, height, backgroundColor }}
      ></div>
    </div>
  );
};

export default BouncingDotsLoader;
