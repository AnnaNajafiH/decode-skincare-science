import jsPDF from "jspdf";
import { InternalBrief } from "../types";

export const generateBriefPDF = (brief: InternalBrief): void => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let y = margin;

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Helper function to add wrapped text
  const addText = (
    text: string,
    fontSize: number,
    isBold: boolean = false,
    color: [number, number, number] = [0, 0, 0]
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    checkPageBreak(lines.length * fontSize * 0.5);
    doc.text(lines, margin, y);
    y += lines.length * fontSize * 0.5 + 3;
  };

  // Header - Blue background
  doc.setFillColor(0, 50, 163); // Beiersdorf blue
  doc.rect(0, 0, pageWidth, 35, "F");

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  const title = brief.title.replace("Campaign Brief: ", "");
  const titleLines = doc.splitTextToSize(title, maxWidth);
  doc.text(titleLines, margin, 15);

  // Badge and audience
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("CAMPAIGN BRIEF", margin, 28);
  doc.text(`Target: ${brief.targetAudience}`, margin + 45, 28);

  y = 45;

  // Headline Section
  doc.setFillColor(239, 246, 255); // Light blue
  doc.rect(margin - 5, y, maxWidth + 10, 20, "F");
  y += 8;
  addText(brief.headline, 13, true, [0, 50, 163]);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text("Campaign headline for all materials", margin, y);
  y += 15;

  // Key Proof Points
  checkPageBreak(20);
  addText("Key Proof Points", 14, true, [0, 50, 163]);
  y += 2;

  brief.keyProofPoints.forEach((point, idx) => {
    checkPageBreak(30);

    // Number circle
    doc.setFillColor(0, 50, 163);
    doc.circle(margin + 3, y + 2, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}`, margin + 3, y + 3, { align: "center" });

    // Point content
    const pointX = margin + 10;
    const pointWidth = maxWidth - 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    const pointLines = doc.splitTextToSize(point.point, pointWidth);
    doc.text(pointLines, pointX, y + 3);
    y += pointLines.length * 5.5;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const evidenceLines = doc.splitTextToSize(point.evidence, pointWidth);
    doc.text(evidenceLines, pointX, y);
    y += evidenceLines.length * 4.5;

    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    const citationLines = doc.splitTextToSize(
      `📚 ${point.citation}`,
      pointWidth
    );
    doc.text(citationLines, pointX, y);
    y += citationLines.length * 4 + 8;
  });

  // Creative Hooks
  checkPageBreak(20);
  addText("Creative Hooks", 14, true, [0, 50, 163]);
  y += 2;

  brief.creativeHooks.forEach((hook) => {
    checkPageBreak(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const hookLines = doc.splitTextToSize(`💡 ${hook}`, maxWidth - 5);
    doc.text(hookLines, margin + 5, y);
    y += hookLines.length * 4.5 + 3;
  });

  y += 5;

  // Sample Social Captions
  checkPageBreak(20);
  addText("Sample Social Captions", 14, true, [0, 50, 163]);
  y += 2;

  brief.sampleCaptions.forEach((caption, idx) => {
    checkPageBreak(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const captionLines = doc.splitTextToSize(
      `${idx + 1}. ${caption}`,
      maxWidth - 5
    );
    doc.text(captionLines, margin + 5, y);
    y += captionLines.length * 4.5 + 3;
  });

  y += 5;

  // Training Snippets
  checkPageBreak(20);
  addText("Training Snippets", 14, true, [0, 50, 163]);
  y += 2;

  brief.trainingSnippets.forEach((snippet) => {
    checkPageBreak(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const snippetLines = doc.splitTextToSize(`→ ${snippet}`, maxWidth - 5);
    doc.text(snippetLines, margin + 5, y);
    y += snippetLines.length * 4.5 + 3;
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated: ${new Date(brief.generatedAt).toLocaleString()}`,
      margin,
      pageHeight - 10
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin - 20,
      pageHeight - 10
    );
  }

  // Save the PDF
  const safeTitle = brief.title
    .replace("Campaign Brief: ", "")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
  doc.save(`${safeTitle}.pdf`);
};
