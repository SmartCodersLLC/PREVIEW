import React from "react";
import { Helmet } from "react-helmet-async";
import { MainContainer } from "../Containers/MainContainer";

export function MainPage() {
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Главная | УМК AVN</title>
      </Helmet>
      <MainContainer />
    </div>
  );
}
