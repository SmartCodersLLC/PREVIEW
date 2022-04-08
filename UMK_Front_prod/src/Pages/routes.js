import React, { lazy } from "react";
import { appName } from "../Service/http";

const MainPage = lazy(() => import("./MainPage"));
const UMKPage = lazy(() => import("./UMKPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const ViewPage = lazy(() => import("./ViewPage"));
// import { MainPage } from "./MainPage";
// import { UMKPage } from "./UMKPage";
// import { LoginPage } from "./LoginPage";
// import { ViewPage } from "./ViewPage";

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
