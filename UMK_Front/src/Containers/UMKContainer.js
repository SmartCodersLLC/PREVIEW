import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { chain, sortBy, sumBy, uniqBy } from "lodash";

import { notify } from "../Utils/notify";
import { exportTableToExcel } from "../Utils/export";
import { printDiv, printDocument } from "../Utils/printer";
import { userState } from "../State/user";
import { yearListState, selectedYearState } from "../State/year";
import { kafedraListState, selectedKafedraState } from "../State/kafedra";
import {
  umkListState,
  selectedUmkState,
  umkDetailListState,
} from "../State/umk";
import { rateListState, selectedRateState } from "../State/rate";

import { SelectorService } from "../Service/selector";
import { UMKService } from "../Service/umk";
import TRWrapper from "../Components/Table/TRWrapper";
import Modal from "../Components/Modal";
import Spinner from "../Components/Spinner";
import "../Styles/UMKContainer.css";
import { baseURL } from "../Service/http";

export function UMKContainer() {
  const { t } = useTranslation();

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

  const [docTypes, setDocTypes] = useState([]);
  const [loading, setLoading] = useState(null);
  const defaultSummary = { discipline: 0, teacher: "0/0" };
  const [summary, setSummary] = useState(defaultSummary);

  const [isOpen, setIsOpen] = useState(false);

  const summaryReset = () => setSummary(defaultSummary);
  const docTypesReset = () => setDocTypes([]);

  const handleYear = (selected) => {
    setYear(selected);
  };
  const handleKafedra = (selected) => {
    setKafedra(selected);
  };
  const handleRate = (selected) => {
    if (kafedra.value === 0 && kafedraList.length > 1) {
      notify(t("selector.chooseDeparment"), "error");
      return;
    }
    setRate(selected);
  };

  const getYearDefault = async () => {
    const { data, message, error } = await SelectorService.yearDefault();
    if (error) {
      notify(message, "error");
    }
    if (data) {
      setYear({ value: data.id, label: data.name });
    }
  };

  const getKafedraList = async () => {
    setLoading(t("umk:report.load.kafedra"));
    console.time("kafedra");
    const { data, message, error } = await SelectorService.kafedraList({
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
    setLoading(t("umk:report.load.umk"));
    const { data, message, error } = await UMKService.list({
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
      setDocTypes([]);
      return;
    }

    if (data?.length === 0) {
      // Если нет данных по дисциплинам и преподавателям, то выводим пустую таблицу
      notify(t("umk:report.noData"), "error");
      setUmkList([]);
      setDocTypes([]);
      return;
    }
    setLoading(t("umk:report.load.render"));
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
    setDocTypes(types);

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
    setLoading(t("umk:report.load.details"));
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
      notify(t("umk:report.noData"), "error");
      setUmkDetailList([]);
      return;
    }
    setUmkDetailList(data);
  };

  const setIsOpenHandler = (isOpenValue) => {
    setIsOpen(isOpenValue);
  };

  const selectUMK = (umk) => {
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
  };
  const view = ({ id, name }) => {
    const fileName = `${id}_${encodeURIComponent(name)}`;
    const type = mimeType(fileName);
    const url = `/avnumk/view?file=${fileName}&type=${type}`;
    window.open(url, "_blank");
  };
  const mimeType = (name) => {
    return name.split(".").pop();
  };

  const printList = () => {
    if (kafedra.value && rate.value && year.value) {
      printDocument();
    } else {
      notify(t("umk:report.noData"), "error");
    }
  };

  const printDetail = () => {
    if (umkSelected) {
      const css = `h5 {text-align: center; margin: 0; margin-bottom: 20px; font-size: 18px;}
      table { border-collapse: collapse; background-color: #fff; width: 100%; font-size: 14px;}
      td.break { float: left; line-height: 22px;}
      td, th { padding: 5px 10px; height: 35px; border: 1px solid #606060 !important;}
      table thead tr, table tbody td, small { color: black !important; }
      .no-print, .no-print-child, .no-print-child * { display: none !important; }
      p { margin: 0; padding: 5px; }
      .text-center { text-align: center;}
      .text-left { text-align: left;}
      .text-right { text-align: right;}`;
      const html = document.getElementById("modalDetail").innerHTML;
      printDiv(html, t("head.umk"), css);
    } else {
      notify(t("umk:report.noData"), "error");
    }
  };

  const exportList = (idTable, fileName) => {
    exportTableToExcel(idTable, fileName);
  };

  useEffect(() => {
    getYearDefault();
  }, []);

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
          placeholder={t("selector.choose")}
          onChange={handleYear}
          options={yearList?.map((d) => d)}
        />
        <Select
          className="Select"
          classNamePrefix="my_select"
          value={kafedra}
          isSearchable={true}
          placeholder={t("cm:selector.choose")}
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
          placeholder={t("cm:selector.choose")}
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
        <div className="flex">
          {umkList?.length > 0 && !isOpen ? (
            <>
              <button
                className="Button"
                title={t("export")}
                onClick={() => {
                  exportList(
                    "listTable",
                    `УМК_${year?.label}_${kafedra.label}_${rate.label}`
                  );
                }}
              >
                <i className="fa fa-file-export"></i>
              </button>

              <button
                className="Button"
                title={t("print")}
                onClick={() => {
                  printList();
                }}
              >
                <i className="fas fa-print"></i>
              </button>
            </>
          ) : null}
        </div>
      </div>

      <Modal
        title={umkSelected?.umkName}
        isOpen={isOpen}
        setIsOpen={setIsOpenHandler}
        id={"modalDetail"}
      >
        <div>
          <div className="text-left">
            <p>
              <small>
                {t("umk:report.kafedra")}: {kafedra.label}
              </small>
            </p>
            <p>
              <small>
                {t("umk:report.rate")}: {umkSelected?.rate}
              </small>
            </p>
            <p>
              <small>
                {t("umk:report.discipline")}: {umkSelected?.p34}
              </small>
            </p>
            <p>
              <small>
                {t("umk:report.teacher")}: {umkSelected?.s_t_fio}
              </small>
            </p>
            <br />
            <div className="no-print flex">
              {umkDetailList?.length > 0 && isOpen ? (
                <>
                  <button
                    className="Button"
                    title={t("export")}
                    onClick={() => {
                      exportList(
                        "detailTable",
                        `УМК_${umkSelected?.umkName}_${kafedra.label}_${rate.label}_${umkSelected?.p34}_${umkSelected?.s_t_fio}`
                      );
                    }}
                  >
                    <i className="fa fa-file-export"></i>
                  </button>
                  <button
                    className="Button"
                    title={t("print")}
                    onClick={() => {
                      printDetail();
                    }}
                  >
                    <i className="fas fa-print"></i>
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {umkDetailList.length > 0 ? (
            <>
              <table id="detailTable">
                <thead>
                  <tr>
                    <th width="5%">№</th>
                    <th>{t("umk:report.table.name")}</th>
                    <th>{t("umk:report.table.description")}</th>
                    <th>{t("umk:report.table.semester")}</th>
                    <th>{t("umk:report.table.file")}</th>
                    <th className="no-print">
                      {t("umk:report.table.download")}
                    </th>
                    <th className="no-print">{t("umk:report.table.view")}</th>
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
                      <td className="no-print">
                        <span
                          className="pointer"
                          title={t("umk:report.table.downloadTitle")}
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

                      <td className="no-print">
                        {isAllowedView(mimeType(umkItem.fileName)) ? (
                          <span
                            className="pointer"
                            title={t("umk:report.table.viewTitle")}
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
        <div className="text-left">
          <p>
            <small>
              {t("umk:report.year")}: {year.label}
            </small>
          </p>
          <p>
            <small>
              {t("umk:report.kafedra")}: {kafedra.label}
            </small>
          </p>
          <p>
            <small>
              {t("umk:report.rate")}: {rate.label}
            </small>
          </p>
          <br />
        </div>

        <table id="listTable">
          <thead>
            <tr>
              <th width="5%">{t("umk:report.discipline")}</th>
              <th>{t("umk:report.teacher")}</th>
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
            {summary.all && (
              <>
                <tr>
                  <td>
                    <b>{t("umk:report.summary.disciplines")}:</b>{" "}
                    {summary?.discipline}
                  </td>
                  <td>
                    {t("umk:report.summary.teachers")} <br /> {summary?.teacher}
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
                    {t("umk:report.summary.all")}: {summary?.all}
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
