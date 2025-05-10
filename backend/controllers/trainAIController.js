let trainingReport = []; // Almacena los reportes de entrenamiento

// Entrenar la IA
const trainAI = async (req, res) => {
    try {
        const { data, type } = req.body; // Datos enviados para entrenar la IA
        if (!data || !type) {
            return res.status(400).json({ error: 'Datos o tipo de entrenamiento no proporcionados.' });
        }

        // Validar que los datos sean una cadena larga si es necesario
        if (typeof data !== 'string' || data.length === 0) {
            return res.status(400).json({ error: 'El campo "data" debe ser una cadena no vacía.' });
        }

        // Simulación de entrenamiento de la IA
        const processedRecords = data.length; // Longitud del texto recibido
        const actions = `La IA procesará un mensaje de ${processedRecords} caracteres para el tipo de entrenamiento: ${type}.`;

        // Guardar el reporte
        trainingReport.push({
            timestamp: new Date(),
            type,
            processedRecords,
            actions
        });

        res.json({ message: 'Entrenamiento iniciado correctamente.', actions });
    } catch (error) {
        console.error('Error al entrenar la IA:', error);
        res.status(500).json({ error: 'Error al entrenar la IA.' });
    }
};

// Obtener el reporte del entrenamiento
const getTrainingReport = (req, res) => {
    try {
        res.json(trainingReport);
    } catch (error) {
        console.error('Error al obtener el reporte del entrenamiento:', error);
        res.status(500).json({ error: 'Error al obtener el reporte del entrenamiento.' });
    }
};

const { extractTextFromImage } = require('../services/imageProcessing');
const fs = require('fs');
const path = require('path');

// Endpoint para procesar imágenes en la IA de entrenamiento
async function processImageForTraining(req, res) {
    const { imagePath } = req.body;
    try {
        const text = await extractTextFromImage(imagePath);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la imagen para entrenamiento', error });
    }
}

// Endpoint para generar la hoja de ruta y actividades
async function generarHojaDeRuta(req, res) {
    try {
        // Leer las fases del archivo JSON
        const phasesPath = path.join(__dirname, '../PDF_tft/pensum_phases.json');
        const phasesData = JSON.parse(fs.readFileSync(phasesPath, 'utf-8'));

        // Crear la hoja de ruta y actividades
        const hojaDeRuta = Object.keys(phasesData).map(fase => {
            return {
                fase: `Fase ${parseInt(fase) + 1}`,
                actividades: phasesData[fase].map((contenido, index) => ({
                    id: `actividad_${fase}_${index + 1}`,
                    descripcion: `Actividad basada en: ${contenido}`,
                    tipo: 'teorica', // Puedes ajustar el tipo según el contenido
                })),
            };
        });

        // Guardar la hoja de ruta en un archivo JSON
        const outputPath = path.join(__dirname, '../PDF_tft/hoja_de_ruta.json');
        fs.writeFileSync(outputPath, JSON.stringify(hojaDeRuta, null, 4));

        res.json({ message: 'Hoja de ruta y actividades generadas correctamente.', hojaDeRuta });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar la hoja de ruta y actividades.', error });
    }
}

module.exports = { trainAI, getTrainingReport, processImageForTraining, generarHojaDeRuta };
