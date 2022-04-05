import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ViewContainer } from "../Containers/ViewContainer";

export function ViewPage() {
  const { t } = useTranslation();
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {t("head.view")} | {t("head.appTitle")}
        </title>
      </Helmet>
      <ViewContainer />
    </div>
  );
}
