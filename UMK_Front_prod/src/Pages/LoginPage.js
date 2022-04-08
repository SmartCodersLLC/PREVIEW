import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { LoginContainer } from "../Containers/LoginContainer";

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {t("head.login")} | {t("head.appTitle")}
        </title>
      </Helmet>
      <LoginContainer />
    </div>
  );
}
