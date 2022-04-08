// print  HTML
function printDiv(divContent, title = "Printer", css = "") {
  const documentPrintWindow = document.getElementById("printWindow");
  if (documentPrintWindow) {
    document.body.removeChild(documentPrintWindow);
  }
  const printWindow = document.createElement("iframe");
  printWindow.style.position = "absolute";
  printWindow.style.top = "-1000px";
  printWindow.style.left = "-1000px";
  printWindow.id = "printWindow";
  const html = `<html><head><title>${title}</title></head><body><style>${css}</style>${divContent}</body></html>`;
  document.body.appendChild(printWindow);
  printWindow.contentWindow.document.open();
  printWindow.contentWindow.document.write(html);
  printWindow.contentWindow.document.close();
  printWindow.contentWindow.print();
}

// print  Document
function printDocument() {
  window.print();
}

export { printDiv, printDocument };
