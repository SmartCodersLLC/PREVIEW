//login
// Language: javascript
// Path: UMK_Front\src\Components\Login\index.js

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./button.module.css";
import { StorageService } from "../../Service/storage";

export default function Button({ logoutHandler, logoutText }) {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    StorageService.setLocalStorage("lang", language);
    StorageService.setCookie("lang", language);
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
      <button className={styles.inactive} onClick={() => logoutHandler()}>
        {logoutText}
      </button>
    </div>
  );
}
