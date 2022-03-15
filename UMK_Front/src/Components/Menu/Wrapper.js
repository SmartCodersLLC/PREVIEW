import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./menuItem.module.css";

export default function MenuWrapper({ children }) {
  const { t } = useTranslation();
  return (
    <>
      <h1 className={styles.title}>{t("menu.title")}</h1>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
