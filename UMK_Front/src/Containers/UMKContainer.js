import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import {
  groupBy,
  map,
  get,
  isEmpty,
  find,
  filter,
  has,
  debounce,
  chain,
  sortBy,
  orderBy,
} from "lodash";

import { notify } from "../Utils/notify";
import { nestGroupsBy } from "../Utils/group";
import { userState } from "../State/user";
import {
  yearListState,
  defaultYearState,
  selectedYearState,
} from "../State/year";
import { kafedraListState, selectedKafedraState } from "../State/kafedra";
import { umkListState } from "../State/umk";
import { numberOfAxiosCallState } from "../State/loader";

import { appName } from "../Service/http";
import { SelectorService } from "../Service/selector";
import { UMKService } from "../Service/umk";
import TRWrapper from "../Components/Table/TRWrapper";
import "../Styles/Report7.css";

export function UMKContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [yearList, setYearList] = useRecoilState(yearListState);
  const [year, setYear] = useRecoilState(selectedYearState);
  const [kafedraList, setKafedraList] = useRecoilState(kafedraListState);
  const [kafedra, setKafedra] = useRecoilState(selectedKafedraState);
  const [umkList, setUmkList] = useRecoilState(umkListState);
  const [calls, setCalls] = useRecoilState(numberOfAxiosCallState);
  const [docTypes, setTypes] = useState([]);
  const handleYear = (selected) => {
    setYear(selected);
  };
  const handleKafedra = (selected) => {
    setKafedra(selected);
  };

  const getKafedraList = async () => {
    const { data, status, message, error } = await SelectorService.kafedraList({
      year: year.value,
    });
    if (error) {
      notify(message, "error");
    } else {
      const kafedraList = data.map(({ id_kafedra, name }) => ({
        value: id_kafedra,
        label: name,
      }));
      setKafedraList(kafedraList);
    }
  };

  const getUmkList = async () => {
    if (!year.value || !kafedra.value) {
      return;
    }
    const { data, status, message, error } = await UMKService.list({
      year: year.value,
      kafedra: kafedra.value,
    });
    if (error) {
      notify(message, "error");
    } else {
      const grouped = nestGroupsBy(data, ["rate", "p34", "s_t_fio", "umkName"]);
      const filteredData = data.filter(({ umkName }) => umkName !== null);
      const types = [...new Set(filteredData.map((item) => item.umkName))];
      let sortedTypes = sortBy(types, ["asc"]);
      console.log({ data });
      // console.log({ grouped });
      console.log({ types });
      setTypes(sortedTypes);
      // let filteredData = chain(data).filter(({ umkName }) => umkName !== null);

      let sortedData = sortBy(
        filteredData,
        ["rate", "p34", "s_t_fio", "umkName"],
        ["asc", "asc", "asc", "asc"]
      );
      console.log({ sortedData });
      let result =
        // filter(data, function (o) {
        //   return o.s_t_fio != null;
        // })
        chain(sortedData)
          .groupBy((x) => x.rate)
          // .sortBy((rate) => data.indexOf(rate))
          .map((rates, key) => ({
            rate_name: key,
            rates: chain(rates)
              // .sortBy((rates) => ["p34"])
              .groupBy((y) => y.p34)
              .map((disciplines, key) => ({
                discipline_name: key,
                disciplines: chain(disciplines)
                  .groupBy((z) => z.s_t_fio)
                  // .sortBy((s_t_fio) => data.indexOf(s_t_fio[0]))
                  .map((teachers, key) => ({
                    teacher_name: key,
                    types: chain(teachers)
                      .groupBy((w) => w.umkName)
                      // .sortBy((umkName) => data.indexOf(umkName[0]))
                      .map((umks, key) => ({
                        umk_name: key,
                        umks: umks,
                      }))
                      .value(),
                  }))
                  .value(),
              }))
              .value(),
          }))
          .value();

      console.log({ result });
      setUmkList(result);
    }
  };

  useEffect(() => {
    getKafedraList();
  }, [year]);

  useEffect(() => {
    getUmkList();
  }, [kafedra]);

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
          value={kafedra}
          isSearchable={false}
          placeholder={t("selector.chooseSeason")}
          onChange={handleKafedra}
          options={kafedraList?.map((d) => {
            return { value: d.value, label: t(d.label) };
          })}
        />
      </div>

      <div className="A4" id="A4">
        <h4>конкурс calls={calls}</h4>

        <table>
          <thead>
            <tr>
              <th width='5%'>Дисциплина</th>
              <th>Преподаватель</th>
              {docTypes.map((type) => (
                <th key={type}>{type}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {umkList?.map((rate) => (
              <>
                <tr key={rate.rate_name}>
                  <td
                    colSpan={2 + docTypes.length}
                    style={{ textAlign: "left" }}
                  >
                    {rate.rate_name}
                  </td>
                </tr>
                {rate.rates.map((discipline, dIndex) =>
                  discipline.disciplines.map((teacher, tIndex) => (
                    <>
                      {tIndex == 0 && (
                        <tr>
                          <td rowSpan={discipline.disciplines.length + 1}>
                            {discipline.discipline_name}
                          </td>
                        </tr>
                      )}
                      <TRWrapper index={tIndex}>
                        <td>{teacher.teacher_name}</td>
                        {docTypes.map((docType, docTypeIndex) => {
                          let umk = teacher.types.filter(
                            (t) => t.umk_name == docType
                          )[0];
                          if (umk)
                            return (
                              <td>
                                  {umk.umks.length}
                              </td>
                            );
                          else return <td>-</td>;
                        })}
                      </TRWrapper>
                    </>
                  ))
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
