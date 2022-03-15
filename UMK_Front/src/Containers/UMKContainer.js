import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userState } from "../State/user";
import {
  yearListState,
  defaultYearState,
  selectedYearState,
} from "../State/year";
import { wsListState, defaultWsState, selectedWsState } from "../State/ws";

import { appName } from "../Service/http";
import Select from "react-select";
import { NavLink } from "react-router-dom";

import "../Styles/Report7.css";

export function UMKContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [yearList, setYearList] = useRecoilState(yearListState);
  const [year, setYear] = useRecoilState(selectedYearState);
  const [wsList, setWsList] = useRecoilState(wsListState);
  const [ws, setWS] = useRecoilState(selectedWsState);

  const handleYear = (selected) => {
    setYear(selected);
  };
  const handleWs = (selected) => {
    setWS(selected);
  };

  return (
    <div className="Report7_Wrapper">
      <div className="Selectors_Wrapper">
        <NavLink to="/avnumk/">
          <button title={t("back")}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </NavLink>
        <Select
          className="Select"
          classNamePrefix="my_select"
          value={year}
          isSearchable={false}
          placeholder={t("selector.chooseYear")}
          onChange={handleYear}
          options={yearList?.map((d) => d)}
        />
        <Select
          className="Select"
          classNamePrefix="my_select"
          value={ws}
          isSearchable={false}
          placeholder={t("selector.chooseSeason")}
          onChange={handleWs}
          options={wsList?.map((d) => {
            return { value: d.value, label: t(d.label) };
          })}
        />
      </div>

      <div className="A4" id="A4">
        <h4>конкурс</h4>

        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Шифр</th>
              <th>Средний балл</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
