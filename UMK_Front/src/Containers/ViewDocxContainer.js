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
import mammoth from "mammoth";

export function ViewContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [doc, setDoc] = useState(null);
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(null);

  const getDoc = async (url) => {
    setLoading("Загрузка документа");
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        setLoading("Обработка документа");
        return mammoth.convertToHtml({ arrayBuffer: ab });
      })
      .then(function (result) {
        console.log({result});
        const htmlValue = result.value;
        setHtml(htmlValue);
        setLoading(null);
      })
      .catch(function (error) {
        setLoading(null);
        console.log(error);
        notify(error.message, "error");
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");
    if (file) {
      const url = `${baseURL}/umk/download?file=${encodeURIComponent(file)}`;
      getDoc(url);
    } else {
      setHtml("Не выбран документ");
    }
  }, []);

  return (
    <div className="UMKContainer">
      <div className="Selectors_Wrapper no-print">
        <div>
          {loading ? (
            <>
              <Spinner size={"15px"} color={"blue"} />
              {loading}
            </>
          ) : null}
        </div>
      </div>

      <div className="A4" id="A4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
