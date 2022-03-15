import React from "react";
import { Helmet } from "react-helmet-async";
import { UMKContainer } from "../Containers/UMKContainer";

export function UMKPage() {
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Отчеты УМК | УМК AVN</title>
      </Helmet>
      <UMKContainer />
    </div>
  );
}
