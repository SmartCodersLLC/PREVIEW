import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { UMKContainer } from "../Containers/UMKContainer";

export function UMKPage() {
  const { t } = useTranslation();
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {t("head.umk")} | {t("head.appTitle")}
        </title>
      </Helmet>
      <UMKContainer />
    </div>
  );
}
