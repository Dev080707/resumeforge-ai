import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Renders the DOM node with id="resume-page" to a print-ready A4 PDF.
 * Handles pagination if the content is taller than one A4 page.
 */
export async function downloadResumeAsPdf(fileName: string) {
  const node = document.getElementById("resume-page");
  if (!node) {
    throw new Error("Resume preview not found. Please generate your resume first.");
  }

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 in mm
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}
