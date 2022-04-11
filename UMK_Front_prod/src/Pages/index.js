import React, { useEffect, useState } from "react";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import TopButton from "../Components/TopButton";
import { http, appName } from "../Service/http";
import { notify } from "../Utils/notify";
import { AuthService } from "../Service/auth";
import { userState } from "../State/user";
import { routes } from "./routes";

const Routes = () => {
  const elements = useRoutes(routes);
  return elements;
};

export default function IndexPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const setUser = useSetRecoilState(userState);
  const [Loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    http.interceptors.request.use(
      (config) => {
        config.params = {
          ...config.params,
          lang: i18n.language,
        };
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(
      (response) => {
        const data = { ...response.data, status: response.status };
        return data;
      },
      (error) => {
        if (error.response === undefined) {
          // server is not responding
          let errorObject = JSON.parse(JSON.stringify(error));
          if (errorObject.status === null) {
            return {
              status: 521,
              message: t("axios.internetError"),
              error: true,
              data: null,
            };
          }
          return {
            status: 522,
            message: t("axios.unknownError"),
            error: true,
            data: null,
          };
        }
        if (
          error.response?.status === 401 &&
          window?.location?.pathname?.includes(`${appName}/login`) === false
        ) {
          // user is not authenticated
          setUser({ isAuthenticated: false, data: null, isLoading: false });
          navigate(`${appName}/login`);

          if (error?.response?.config?.url?.includes("auth/check") === false) {
            // user is not on login page and not on auth/check , session is expired when user is working
            notify(t("axios.sessionExpired"), "error");
            throw "Срок сессии истек!";
          }

          // return Promise.reject(error);
        }

        const data = { ...error.response.data, status: error.response.status };
        return data;
      }
    );

    setUser({ isAuthenticated: false, data: null, isLoading: true });
    AuthService.check().then(({ data, error, message, status }) => {
      if (error) {
        setUser({ isAuthenticated: false, data: null, isLoading: false });
        notify(message, "error");
      } else {
        notify(message, "success");
        setUser({ isAuthenticated: true, data, isLoading: false });
        if (window?.location?.pathname?.includes(`${appName}/login`)) {
          // if in login page and auth=true
          navigate(`${appName}/`);
        } else {
          // if not in login page and auth=true
          navigate(`${pathname}${window.location.search}`);
        }
      }
      setLoading(false);
    });
  }, []);

  if (Loading) {
    return <div>{t("loading")}</div>;
  }
  return (
    <div className="Page" id="Page">
      <Routes />
      <TopButton />
    </div>
  );
}
