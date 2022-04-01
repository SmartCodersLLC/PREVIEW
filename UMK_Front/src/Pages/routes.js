import React from "react";
import { MainPage } from "./MainPage";
import { UMKPage } from "./UMKPage";
import { LoginPage } from "./LoginPage";
import { ViewPage } from "./ViewPage";
import { appName } from "../Service/http";

export const routes = [
  {
    path: `${appName}/`,
    element: <MainPage />,
    title: "Главная",
  },
  {
    path: `${appName}/umk/*`,
    element: <UMKPage />,
    title: "УМК",
    children: [
      {
        path: `:id`,
        element: <ViewPage />,
        title: "Просмотр документа",
      },
    ],
  },
  {
    path: `${appName}/view`,
    element: <ViewPage />,
    title: "Просмотр документа",
  },
  {
    path: `${appName}/login`,
    element: <LoginPage />,
    title: "Авторизация",
  },
  {
    path: `*`,
    element: <LoginPage />,
    title: "Начало",
  },
];
