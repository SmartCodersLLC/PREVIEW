import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileTypeXlsx =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// const fileTypeXlsb = "application/vnd.ms-excel.sheet.binary.macroEnabled.12";

// export Table to Excel
function exportTableToExcel(tableID, fileName = "export_table") {
  const table_elt = document.getElementById(tableID);
//   const ws = XLSX.utils.table_to_sheet(table_elt);
  const wb = XLSX.utils.table_to_book(table_elt);

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileTypeXlsx });
  FileSaver.saveAs(data, fileName + ".xlsx");
}

// export JSON to CSV
function exportJsonToCSV(jsonData, fileName = "export_json") {
  const ws = XLSX.utils.json_to_sheet(jsonData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileTypeXlsx });
  FileSaver.saveAs(data, fileName + ".xlsx");
}

export { exportTableToExcel, exportJsonToCSV };
