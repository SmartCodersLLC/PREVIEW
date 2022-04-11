import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Page from "./Pages";
import "./index.css";
import "./Utils/i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Загрузка...</div>}>
      <RecoilRoot>
        <HelmetProvider>
          <div className="App">
            <Router>
              <Page />
            </Router>
            <ToastContainer />
          </div>
        </HelmetProvider>
      </RecoilRoot>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
