//login
// Language: javascript
// Path: UMK_Front\src\Components\Login\index.js

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./login.module.css";

export default function Login({
  login,
  password,
  setLogin,
  setPassword,
  loginRef,
  passwordRef,
  handleLogin,
  isLoading,
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1 className={styles.title}>{t("login.title")}</h1>
          <div className={styles.field}>
            <input
              type="text"
              placeholder={t("login.login")}
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              ref={loginRef}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className={styles.field}>
            <input
              type="password"
              placeholder={t("login.password")}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
            />
            <i className="fa fa-lock"></i>
          </div>
          <div className={styles.submit}>
            <button
              className={styles.button}
              type="submit"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? t("loading") : t("login.sign")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
