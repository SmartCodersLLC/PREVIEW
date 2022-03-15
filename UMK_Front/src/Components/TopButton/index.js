//goto top button
// Language: javascript
// Path: UMK_Front\src\Components\topButton.js

import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next"; 
import styles from "./topButton.module.css";

export default function TopButton() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (show) {
    return (
      <button
        className={styles.Scroll_Top_button}
        onClick={scrollToTop}
        title={t("goTop")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          fill="#fff"
          viewBox="0 0 1000 1000"
          enable-background="new 0 0 1000 1000"
        >
          <g>
            <path d="M545.6,233l425.5,439.8c25.2,26,25.2,68.2,0,94.3c-25.2,26-66,26-91.2,0L500,374.3L120.1,767c-25.2,26-66,26-91.2,0c-25.2-26-25.2-68.2,0-94.3L454.4,233C479.6,207,520.4,207,545.6,233z" />
          </g>
        </svg>
      </button>
    );
  }
  return null;
}
