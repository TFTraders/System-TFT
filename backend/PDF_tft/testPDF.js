const path = require('path');
const { extractTextFromPDF, processPDFTextForAI } = require('../services/pdf');

(async () => {
    try {
        // Ruta del archivo PDF
        const pdfPath = path.join(__dirname, 'Copia de Pensum académico TfT Nuevo Canva.pdf');

        // Extraer texto del PDF
        const text = await extractTextFromPDF(pdfPath);
        console.log('Texto extraído del PDF:', text);

        // Procesar texto para IA
        const processedData = processPDFTextForAI(text);
        console.log('Datos procesados para IA:', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
