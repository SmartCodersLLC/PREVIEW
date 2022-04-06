import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Page from "./Pages";
import "./index.css";
import "./Utils/i18n";

// function DebugObserver(): React.Node {
//   const snapshot = useRecoilSnapshot();
//   useEffect(() => {
//     console.debug("The following atoms were modified:");
//     for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
//       console.debug(
//         "DebugObserver--->>>",
//         node.key,
//         snapshot.getLoadable(node)
//       );
//     }
//   }, [snapshot]);

//   return null;
// }

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <DebugObserver /> */}

      <HelmetProvider>
        <div className="App">
          <Router>
            <Page />
          </Router>
          <ToastContainer />
        </div>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
