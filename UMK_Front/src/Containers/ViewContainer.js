import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { notify } from "../Utils/notify";
import { userState } from "../State/user";

import {
  umkListState,
  selectedUmkState,
  umkDetailListState,
} from "../State/umk";
import { numberOfAxiosCallState } from "../State/loader";

import { appName } from "../Service/http";
import { SelectorService } from "../Service/selector";
import { UMKService } from "../Service/umk";
import TRWrapper from "../Components/Table/TRWrapper";
import Modal from "../Components/Modal";
import Spinner from "../Components/Spinner";
import "../Styles/UMKContainer.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export function ViewContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [umkList, setUmkList] = useRecoilState(umkListState);
  const umkListReset = useResetRecoilState(umkListState);
  const [umkDetailList, setUmkDetailList] = useRecoilState(umkDetailListState);
  const umkDetailListReset = useResetRecoilState(umkDetailListState);
  const [umkSelected, setUmkSelected] = useRecoilState(selectedUmkState);
  const umkSelectedReset = useResetRecoilState(selectedUmkState);

  const defaultDocs = [
    // { uri: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf" },
    { uri: ".pdf" },
  ];
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(null);

  // return <DocViewer documents={docs} />;

  return (
    <div>
      View
      {/* <DocViewer
        pluginRenderers={[PDFRenderer, PNGRenderer]}
        documents={docs}
      /> */}
      {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
      {/* <DocViewer  documents={docs} /> */}
    </div>
  );
  // return (
  //   <div className="UMKContainer">
  //     <div className="Selectors_Wrapper no-print">
  //       <NavLink to="/avnumk/">
  //         <button title={t("back")}>
  //           <i className="fas fa-arrow-left"></i>
  //         </button>
  //       </NavLink>

  //       <div>
  //         {loading ? (
  //           <>
  //             <Spinner size={"15px"} color={"blue"} />
  //             {loading}
  //           </>
  //         ) : null}
  //       </div>
  //     </div>

  //     <div className="A4" id="A4"></div>
  //   </div>
  // );
}
