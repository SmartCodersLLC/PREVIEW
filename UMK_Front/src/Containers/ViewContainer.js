import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { notify } from "../Utils/notify";

import { baseURL } from "../Service/http";
import "../Styles/UMKContainer.css";
import FileViewer from "react-file-viewer";

export function ViewContainer() {
  const { t } = useTranslation();

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
          <div>
            <h1>{t("error")}</h1>
            <p>{t("umk:view.notFound")}</p>
            <p>{error}</p>
          </div>
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
