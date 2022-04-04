import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
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
  sumBy,
  uniqBy,
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
import {
  umkListState,
  selectedUmkState,
  umkDetailListState,
} from "../State/umk";
import { rateListState, selectedRateState } from "../State/rate";
import { numberOfAxiosCallState } from "../State/loader";

import { appName } from "../Service/http";
import { SelectorService } from "../Service/selector";
import { UMKService } from "../Service/umk";
import TRWrapper from "../Components/Table/TRWrapper";
import Modal from "../Components/Modal";
import Spinner from "../Components/Spinner";
import "../Styles/UMKContainer.css";
import { baseURL } from "../Service/http";

export function UMKContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [yearList, setYearList] = useRecoilState(yearListState);
  const [year, setYear] = useRecoilState(selectedYearState);

  const [kafedraList, setKafedraList] = useRecoilState(kafedraListState);
  const kafedraListReset = useResetRecoilState(kafedraListState);
  const [kafedra, setKafedra] = useRecoilState(selectedKafedraState);
  const kafedraReset = useResetRecoilState(selectedKafedraState);

  const [umkList, setUmkList] = useRecoilState(umkListState);
  const umkListReset = useResetRecoilState(umkListState);
  const [umkDetailList, setUmkDetailList] = useRecoilState(umkDetailListState);
  const umkDetailListReset = useResetRecoilState(umkDetailListState);
  const [umkSelected, setUmkSelected] = useRecoilState(selectedUmkState);
  const umkSelectedReset = useResetRecoilState(selectedUmkState);

  const [rateList, setRateList] = useRecoilState(rateListState);
  const [rate, setRate] = useRecoilState(selectedRateState);
  const rateReset = useResetRecoilState(selectedRateState);

  const [calls, setCalls] = useRecoilState(numberOfAxiosCallState);

  const [docTypes, setTypes] = useState([]);
  const [loading, setLoading] = useState(null);
  const defaultSummary = { discipline: 0, teacher: "0/0" };
  const [summary, setSummary] = useState(defaultSummary);

  const [isOpen, setIsOpen] = useState(false);

  const summaryReset = () => setSummary(defaultSummary);
  const docTypesReset = () => setTypes([]);

  const handleYear = (selected) => {
    setYear(selected);
  };
  const handleKafedra = (selected) => {
    setKafedra(selected);
  };
  const handleRate = (selected) => {
    if (kafedra.value === 0 && kafedraList.length > 1) {
      notify(t("selector.chooseSeason"), "error");
      return;
    }
    setRate(selected);
  };

  const getKafedraList = async () => {
    setLoading("Загрузка списка кафедр...");
    console.time("kafedra");
    const { data, status, message, error } = await SelectorService.kafedraList({
      year: year.value,
    });
    if (error) {
      notify(message, "error");
    }
    if (data.length === 0) {
      notify(t("selector.noKafedra"), "error");
      setLoading(null);
      return;
    }
    const kafedraList = data.map(({ id_kafedra, name }) => ({
      value: id_kafedra,
      label: name,
    }));
    setKafedraList(kafedraList);

    setLoading(null);
    console.timeEnd("kafedra");
  };

  const getUmkList = async () => {
    if (kafedraList.length < 2 || kafedra.value === 0 || rate.value === 0) {
      return;
    }
    console.time("getUmkList");
    setLoading("Загрузка УМК...");
    const { data, status, message, error } = await UMKService.list({
      year: year.value,
      kafedra: kafedra.value,
      rate: rate.value,
    });
    setLoading(null);
    console.timeEnd("getUmkList");
    if (error) {
      // Ошибка при получении списка УМК
      notify(message, "error");
      setUmkList([]);
      setTypes([]);
      return;
    }

    if (data?.length === 0) {
      // Если нет данных по дисциплинам и преподавателям, то выводим пустую таблицу
      notify(t("report.noData"), "error");
      setUmkList([]);
      setTypes([]);
      return;
    }
    setLoading("Идет группировка УМК...");
    console.time("render");
    // Сортируем по названию дисциплины, преподавателя
    const sortedData = sortBy(data, ["p34", "s_t_fio"], ["asc", "asc"]);
    // Группируем по дисциплине и преподавателю для отображения в таблице
    const umkGrouped = chain(sortedData)
      .groupBy((y) => y.p34)
      .map((disciplines, key) => ({
        discipline_name: key,
        disciplines: chain(disciplines)
          .groupBy((z) => z.s_t_fio)
          .map((teachers, key) => ({
            teacher_name: key,
            teacher_id: teachers[0].id_teacher,
            types: chain(teachers)
              .groupBy((w) => w.umkName)
              .map((umks, key) => ({
                umk_name: key,
                kol: sumBy(umks, "kol"),
                umks: umks,
              }))
              .value(),
          }))
          .value(),
      }))
      .value();

    setUmkList(umkGrouped);
    // Типы УМК
    const types = uniqBy(data, (item) => item.umkName)
      .sort((a, b) => a.sort > b.sort)
      .map((item) => item.umkName);

    // Количество УМК по типу
    let summaryTypes = {};
    types.forEach((type) => {
      const filtered = data.filter((item) => item.umkName === type);
      let summa = filtered.reduce((partialSum, a) => {
        if (a.id_teacher == -1) {
          // Количесиво незаполненых УМК и преподавателей
          return (partialSum += 1);
        } else {
          // Суммируем количество УМК
          summaryTypes["all"] = summaryTypes["all"]
            ? summaryTypes["all"] + a.kol
            : a.kol;
          // Суммируем количество УМК по типу
          return partialSum + a.kol;
        }
      }, 0);
      summaryTypes[type] = summa;
    });

    setTypes(types);

    // Количество преподавателей  уникальных по дисциплине
    const uniqueTeacherPerDiscipline = umkGrouped
      .map((item) =>
        item.disciplines.map((discipline) => discipline.teacher_id)
      )
      .flat()
      .filter((item) => item > 0);
    // Количество преподавателей  уникальных по кафедре
    const uniqueTeachers = new Set(uniqueTeacherPerDiscipline);

    //  Итоговый отчет
    setSummary({
      discipline: umkGrouped.length,
      teacher: `${uniqueTeachers.size} / ${uniqueTeacherPerDiscipline.length}`,
      ...summaryTypes,
    });

    setLoading(null);
    console.timeEnd("render");
  };

  const getUmkDetails = async (umkInstance) => {
    console.time("getUmkDetails");
    setLoading("Загрузка деталей УМК...");
    const { data, status, message, error } = await UMKService.detail({
      rate: rate.value,
      id_discipline: umkInstance.id_discipline,
      id_typeUmk: umkInstance.id_typeUmk,
      id_teacher: umkInstance.id_teacher,
    });
    setLoading(null);
    console.timeEnd("getUmkDetails");
    if (error) {
      // Ошибка при получении деталей УМК
      notify(message, "error");
      setUmkDetailList([]);
      return;
    }
    if (status === 404) {
      // Если нет данных по дисциплинам и преподавателям, то выводим пустую таблицу
      notify(t("report.noData"), "error");
      setUmkDetailList([]);
      return;
    }
    setUmkDetailList(data);
  };

  const setIsOpenHandler = (isOpenValue) => {
    setIsOpen(isOpenValue);
  };

  const selectUMK = (umk) => {
    console.log({ umk });
    umkDetailListReset();
    setIsOpen(true);
    setUmkSelected(umk);
    getUmkDetails(umk);
  };

  const viewList = [
    "csv",
    "xlsx",
    "jpg",
    "jpeg",
    "gif",
    "gif",
    "png",
    "pdf",
    "docx",
    "mp3",
    "webm",
    "mp4",
    "wexbim",
  ];
  const isAllowedView = (type) => {
    return viewList.includes(type);
  };

  const download = ({ id, name }) => {
    const fileName = `${id}_${encodeURIComponent(name)}`;
    const url = `${baseURL}/umk/download?file=${fileName}`;
    window.open(url, "_blank");
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = name;
    // link.click();
  };
  const view = ({ id, name }) => {
    const type = mimeType(name);
    if (!isAllowedView(type)) {
      notify(t("report.notAllowedView"), "error");
      return;
    }
    const fileName = `${id}_${encodeURIComponent(name)}`;
    const url = `/avnumk/view?file=${fileName}&type=${type}`;
    window.open(url, "_blank");
  };
  const mimeType = (name) => {
    return name.split(".").pop();
  };

  useEffect(() => {
    kafedraReset();
    kafedraListReset();
    rateReset();
    umkListReset();
    summaryReset();
    docTypesReset();
    getKafedraList();
  }, [year]);

  useEffect(() => {
    umkListReset();
    rateReset();
    summaryReset();
    docTypesReset();
  }, [kafedra]);

  useEffect(() => {
    umkListReset();
    summaryReset();
    docTypesReset();
    getUmkList();
  }, [rate]);

  return (
    <div className="UMKContainer">
      <div className="Selectors_Wrapper no-print">
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
          isSearchable={true}
          placeholder={t("selector.chooseSeason")}
          onChange={handleKafedra}
          options={kafedraList?.map((d) => {
            return { value: d.value, label: t(d.label) };
          })}
        />
        <Select
          className="Select"
          classNamePrefix="my_select"
          value={rate}
          isSearchable={false}
          placeholder={t("selector.chooseRate")}
          onChange={handleRate}
          options={rateList?.map((d) => {
            return { value: d.value, label: t(d.label) };
          })}
        />
        <div>
          {loading ? (
            <>
              <Spinner size={"15px"} color={"blue"} />
              {loading}
            </>
          ) : null}
        </div>
      </div>

      <Modal
        title={umkSelected?.umkName}
        isOpen={isOpen}
        setIsOpen={setIsOpenHandler}
      >
        <div>
          <div className="text-left">
            <p>
              <small>Кафедра: {kafedra.label}</small>
            </p>
            <p>
              <small>Курс: {umkSelected?.rate}</small>
            </p>
            <p>
              <small>Дисциплина: {umkSelected?.p34}</small>
            </p>
            <p>
              <small>Преподаватель: {umkSelected?.s_t_fio}</small>
            </p>
            <br />
          </div>

          {umkDetailList.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th width="5%">№</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Семестр</th>
                    <th>Файл</th>
                    <th>Скачать</th>
                    <th>Посмотреть</th>
                  </tr>
                </thead>
                <tbody>
                  {umkDetailList.map((umkItem, umkIndex) => (
                    <tr key={umkItem.id}>
                      <td>{umkIndex + 1}</td>
                      <td>{umkItem.name}</td>
                      <td>{umkItem.description}</td>
                      <td>{umkItem.p43}</td>
                      <td>{umkItem.fileName}</td>
                      <td>
                        <span
                          className="pointer"
                          title="Нажмите, чтобы скачать"
                          onClick={() =>
                            download({
                              id: umkItem.id,
                              name: umkItem.fileName,
                            })
                          }
                        >
                          <i className="fas fa-download"></i>
                        </span>
                      </td>

                      <td>
                        {isAllowedView(mimeType(umkItem.fileName)) ? (
                          <span
                            className="pointer"
                            title="Нажмите, чтобы посмотреть"
                            onClick={() =>
                              view({
                                id: umkItem.id,
                                name: umkItem.fileName,
                              })
                            }
                          >
                            {" "}
                            <i className="fas fa-eye"></i>
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </Modal>

      <div className="A4" id="A4">
        <h4>конкурс calls={calls}</h4>
        <p>Учебный год - {year.label} </p>
        <p>Кафедра - {kafedra.label} </p>
        <p>Курс - {rate.label} </p>
        <table>
          <thead>
            <tr>
              <th width="5%">Дисциплина</th>
              <th>Преподаватель</th>
              {docTypes.map((type) => (
                <th key={type}>{type}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {umkList?.map((discipline, dIndex) =>
              discipline.disciplines.map((teacher, tIndex) => (
                <TRWrapper
                  index={tIndex}
                  rowSpaner={
                    <td rowSpan={discipline.disciplines.length}>
                      {discipline.discipline_name}
                    </td>
                  }
                >
                  <td>{teacher.teacher_name}</td>
                  {docTypes.map((docType, docTypeIndex) => {
                    let umk = teacher.types.filter(
                      (t) => t.umk_name == docType
                    )[0];
                    if (umk?.umks.length)
                      return (
                        <td key={docTypeIndex + "" + umk?.umk_name}>
                          <div
                            className="umkCount"
                            onClick={() => selectUMK(umk?.umks[0])}
                          >
                            {umk?.kol}
                          </div>
                        </td>
                      );
                    else return <td>-</td>;
                  })}
                </TRWrapper>
              ))
            )}
            {docTypes.all && (
              <>
                <tr>
                  <td>
                    <b>Дисциплин:</b> {summary?.discipline}
                  </td>
                  <td>
                    Все / По дисциплинам <br /> {summary?.teacher}
                  </td>
                  {docTypes.map((type) => (
                    <td key={type}>
                      {type} <br />
                      {summary[type]}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td colSpan={2 + docTypes?.length}>
                    Всего УМК: {summary?.all}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
