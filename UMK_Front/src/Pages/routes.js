import React, { Lazy } from "react";
import { appName } from "../Service/http";

const MainPage = Lazy(() => import("./MainPage"));
const UMKPage = Lazy(() => import("./UMKPage"));
const LoginPage = Lazy(() => import("./LoginPage"));
const ViewPage = Lazy(() => import("./ViewPage"));
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
