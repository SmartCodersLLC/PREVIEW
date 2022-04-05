import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { MainContainer } from "../Containers/MainContainer";

export function MainPage() {
  const { t } = useTranslation();
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {t("head.menu")} | {t("head.appTitle")}
        </title>
      </Helmet>
      <MainContainer />
    </div>
  );
}
