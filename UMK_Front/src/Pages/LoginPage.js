import React from "react";
import { Helmet } from "react-helmet-async";
import { LoginContainer } from "../Containers/LoginContainer";

export function LoginPage() {
  return (
    <div className="Main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Авторизация | УМК AVN</title>
      </Helmet>
      <LoginContainer />
    </div>
  );
}
