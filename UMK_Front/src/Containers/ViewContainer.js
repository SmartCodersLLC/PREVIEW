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
    console.log({ file, type });
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
      setError("Не выбран документ");
    }
  }, []);

  if (!filePath || !type) {
    return (
      <div>
        <h1> Ошибка</h1>
        <p>Файл не указан!</p>
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
  return (
    <div>
      <h1> Ошибка</h1>
      <p> Файл не найден! </p>
      <p> {error}</p>
    </div>
  );
}
