import React from "react";
import { Helmet } from "react-helmet-async";
import { ViewContainer } from "../Containers/ViewContainer";

export function ViewPage() {
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Просмотр документа | УМК AVN</title>
      </Helmet>
      <ViewContainer />
    </div>
  );
}
