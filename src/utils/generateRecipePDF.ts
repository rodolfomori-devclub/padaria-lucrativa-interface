import jsPDF from "jspdf";
import { recipeService } from "~/services/recipes";
import { UNIT_MEASURE_LABELS } from "~/types/input";

const BRAND_COLORS = {
  base: "#0B1A31",
  highlight: "#FFAD02",
  baseLight: "#F5F6FA",
};

export const generateRecipePDF = async (recipeId: string): Promise<void> => {
  try {
    const recipeData = await recipeService.getPdfData(recipeId);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    doc.setFillColor("#FFFFFF");
    doc.rect(0, 0, pageWidth, 20, "F");

    doc.setTextColor(BRAND_COLORS.base);
    doc.setFontSize(24);
    doc.setFont("helvetica", "italic", "bold");
    doc.text("Padaria Lucrativa - Receita", pageWidth / 2, 20, {
      align: "center",
    });

    yPosition = 35;

    doc.setTextColor(BRAND_COLORS.highlight);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(recipeData.name.toUpperCase(), pageWidth / 2, yPosition, {
      align: "center",
    });

    yPosition += 15;

    doc.setTextColor(BRAND_COLORS.base);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const yieldText = `Rendimento: ${recipeData.yield} ${UNIT_MEASURE_LABELS[recipeData.unitMeasure]}`;
    doc.text(yieldText, pageWidth / 2, yPosition, { align: "center" });

    yPosition += 20;

    doc.setTextColor(BRAND_COLORS.base);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INGREDIENTES", margin, yPosition);

    yPosition += 10;

    doc.setDrawColor(BRAND_COLORS.highlight);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const columnWidth = (pageWidth - 2 * margin) / 2;
    const ingredientColumnX = margin;
    const quantityColumnX = margin + columnWidth;

    doc.setFont("helvetica", "bold");
    doc.text("Ingrediente", ingredientColumnX, yPosition);
    doc.text("Quantidade", quantityColumnX, yPosition);

    yPosition += 7;

    doc.setFont("helvetica", "normal");

    for (const input of recipeData.inputs) {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }

      const quantityText = `${input.quantity} ${UNIT_MEASURE_LABELS[input.unitMeasure]}`;

      doc.text(input.name, ingredientColumnX, yPosition);
      doc.text(quantityText, quantityColumnX, yPosition);

      yPosition += 7;
    }

    yPosition += 10;
    doc.setDrawColor(BRAND_COLORS.highlight);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    const footerY = pageHeight - 15;
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    const generationDate = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Gerado em: ${generationDate}`, pageWidth / 2, footerY, {
      align: "center",
    });

    const fileName = `receita-${recipeData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}.pdf`;

    doc.save(fileName);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw new Error("Falha ao gerar PDF da receita");
  }
};
