const fs = require('fs');
const pdfParse = require('pdf-parse');
const pdfjsLib = require('pdfjs-dist');

/**
 * Extract text content from a PDF file.
 * @param {string} filePath - The path to the PDF file.
 * @returns {Promise<string>} - A promise that resolves with the extracted text.
 */
async function extractTextFromPDF(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    }
}

/**
 * Process the extracted text for AI training or other purposes.
 * @param {string} text - The extracted text from the PDF.
 * @returns {object} - Processed data ready for AI or other use cases.
 */
function processPDFTextForAI(text) {
    // Example: Split text into sections or phases based on custom logic
    const sections = text.split(/\n\n+/); // Split by double newlines
    return sections.map((section, index) => ({
        id: index + 1,
        content: section.trim(),
    }));
}

// Función para procesar imágenes y texto en PDFs
async function extractImagesAndTextFromPDF(filePath) {
    const loadingTask = pdfjsLib.getDocument(filePath);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    const extractedData = [];

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');

        // Aquí puedes agregar lógica para extraer imágenes si es necesario

        extractedData.push({ page: i, text });
    }

    return extractedData;
}

module.exports = {
    extractTextFromPDF,
    processPDFTextForAI,
    extractImagesAndTextFromPDF,
};
