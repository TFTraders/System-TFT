const Tesseract = require('tesseract.js');

/**
 * Extract text from an image using OCR.
 * @param {string} imagePath - The path to the image file.
 * @returns {Promise<string>} - A promise that resolves with the extracted text.
 */
async function extractTextFromImage(imagePath) {
    try {
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
        return text;
    } catch (error) {
        console.error('Error extracting text from image:', error);
        throw error;
    }
}

module.exports = {
    extractTextFromImage,
};