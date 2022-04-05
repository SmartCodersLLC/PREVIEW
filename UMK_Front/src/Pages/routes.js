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
  },
  {
    path: `${appName}/umk/*`,
    element: <UMKPage />,
  },
  {
    path: `${appName}/view`,
    element: <ViewPage />,
  },
  {
    path: `${appName}/login`,
    element: <LoginPage />,
  },
  {
    path: `*`,
    element: <LoginPage />,
  },
];
