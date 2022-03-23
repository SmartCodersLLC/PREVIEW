//login
// Language: javascript
// Path: UMK_Front\src\Components\Login\index.js

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./language.module.css";

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export default function Language() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem("lang", language);
    setCookie("lang", language, 7);
  };
  return (
    <div className={styles.list}>
      <button
        className={i18n.language === "kg" ? styles.active : styles.inactive}
        onClick={() => changeLanguage("kg")}
      >
        Кыр
      </button>
      <button
        className={i18n.language === "ru" ? styles.active : styles.inactive}
        onClick={() => changeLanguage("ru")}
      >
        Рус
      </button>
      <button
        className={i18n.language === "en" ? styles.active : styles.inactive}
        onClick={() => changeLanguage("en")}
      >
        Eng
      </button>
    </div>
  );
}
