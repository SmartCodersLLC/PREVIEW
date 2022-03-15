import React, { useEffect, useState, Suspense } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import TopButton from "../Components/TopButton";
import { http, appName } from "../Service/http";
import { notify } from "../Utils/notify";
import { AuthService } from "../Service/auth";
import { userState } from "../State/user";
import { routes } from "./routes";

export default function IndexPage() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [Loading, setLoading] = useState(true);
  const routesList = useRoutes(routes);

  useEffect(() => {
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
              message:
                "Ошибка интернет соединения, проверьте подключение к интернету",
              error: true,
              data: null,
            };
          }
          return {
            status: 522,
            message: "Неизвестная ошибка интернет соединения",
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
            notify("Срок сессии истек, пожалуйста авторизуйтесь", "error");
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
      console.log("AuthService", data, error, message, status);
      if (error) {
        setUser({ isAuthenticated: false, data: null, isLoading: false });
        notify(message, "error");
      } else {
        notify(message, "success");
        setUser({ isAuthenticated: true, data, isLoading: false });
        // navigate(`${appName}/`);
      }
      setLoading(false);
    });
  }, []);

  if (Loading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="Page" id="Page">
      {routesList}
      <TopButton />
    </div>
  );
}
