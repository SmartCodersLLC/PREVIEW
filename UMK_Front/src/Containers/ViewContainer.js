import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { notify } from "../Utils/notify";
import { userState } from "../State/user";

import { baseURL } from "../Service/http";
import Spinner from "../Components/Spinner";
import "../Styles/UMKContainer.css";
import FileViewer from "react-file-viewer";

export function ViewContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [filePath, setFilePath] = useState(null);
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);

  function onErrorFun(error) {
    console.log({ error });
    notify(error.message, "error");
    setError(error);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");
    const type = params.get("type");
    if (file && type) {
      const url = `${baseURL}/umk/download?file=${encodeURIComponent(file)}`;
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            setFilePath(url);
            setType(type);
          } else {
            res.json().then((data) => {
              setError(data.message);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          notify(error.message, "error");
        });
    } else {
      setError(t("umk:view.noChoosen"));
    }
  }, []);

  if (!filePath || !type) {
    return (
      <div>
        <h1>{t("error")}</h1>
        <p>{t("umk:view.noFile")}</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="UMKContainer">
      <div className="A4" id="A4">
        {error ? (
          <>
            <CustomErrorComponent error={error} />
          </>
        ) : (
          <FileViewer
            fileType={type}
            filePath={filePath}
            onError={onErrorFun}
          />
        )}
      </div>
    </div>
  );
}

function CustomErrorComponent({ error }) {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("error")}</h1>
      <p>{t("umk:view.notFound")}</p>
      <p>{error}</p>
    </div>
  );
}
