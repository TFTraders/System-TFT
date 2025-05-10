const Auditoria = require('../models/auditoria');
const Emocional = require('../models/emocional');
const Alumnos = require('../models/alumnos'); // Asegúrate de tener el modelo de Alumnos
const Medalla = require('../models/emocional');
const { extractTextFromImage } = require('../services/imageProcessing');

// Combinar datos de auditoría y registro emocional
const getTradingData = async (req, res) => {
    try {
        const auditoriaData = await Auditoria.findAll();
        const emocionalData = await Emocional.findAll();

        // Combinar datos
        const combinedData = auditoriaData.map((auditoria) => {
            const emocional = emocionalData.find(e => e.fecha === auditoria.fecha);
            return {
                fecha: auditoria.fecha,
                resultadoAuditoria: auditoria.resultado,
                estadoEmocional: emocional ? emocional.estadoEmocional : 'N/A',
                comentarios: auditoria.comentarios,
                notasEmocionales: emocional ? emocional.notas : 'Sin notas'
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error al obtener datos del Manager de Trading:', error);
        res.status(500).json({ error: 'Error al obtener datos del Manager de Trading' });
    }
};

// Obtener datos de auditoría
const getAuditoriaData = async (req, res) => {
    try {
        const auditoriaData = await Auditoria.findAll();
        res.json(auditoriaData);
    } catch (error) {
        console.error('Error al obtener datos de auditoría:', error);
        res.status(500).json({ error: 'Error al obtener datos de auditoría' });
    }
};

// Obtener datos del registro emocional
const getEmocionalData = async (req, res) => {
    try {
        const emocionalData = await Emocional.findAll();
        res.json(emocionalData);
    } catch (error) {
        console.error('Error al obtener datos del registro emocional:', error);
        res.status(500).json({ error: 'Error al obtener datos del registro emocional' });
    }
};

// Endpoint para consultar la fase actual de un alumno
const getFaseActual = async (req, res) => {
    const { alumnoId } = req.params;
    try {
        const alumno = await Alumnos.findByPk(alumnoId);
        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }
        res.json({ fase_actual: alumno.fase_actual });
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar la fase actual', error });
    }
};

// Endpoint para actualizar la fase de un alumno
const updateFase = async (req, res) => {
    const { alumnoId } = req.params;
    const { fase_actual } = req.body;
    try {
        const alumno = await Alumnos.findByPk(alumnoId);
        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }
        alumno.fase_actual = fase_actual;
        await alumno.save();
        res.json({ message: 'Fase actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la fase', error });
    }
};

// Endpoint para listar alumnos por fase
const listAlumnosByFase = async (req, res) => {
    const { fase_actual } = req.query;
    try {
        const alumnos = await Alumnos.findAll({ where: { fase_actual } });
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar alumnos por fase', error });
    }
};

// Endpoint para procesar imágenes en la IA de gestión
async function processImageForManagement(req, res) {
    const { imagePath } = req.body;
    try {
        const text = await extractTextFromImage(imagePath);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la imagen para gestión', error });
    }
}

// Endpoint para asignar medallas a estudiantes
async function asignarMedalla(req, res) {
    const { estudianteId, medallaId } = req.body;
    try {
        const estudiante = await Estudiante.findByPk(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        const medalla = await Medalla.findByPk(medallaId);
        if (!medalla) {
            return res.status(404).json({ message: 'Medalla no encontrada' });
        }

        await estudiante.addMedalla(medalla);
        res.json({ message: 'Medalla asignada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar la medalla', error });
    }
}

// Endpoint para asignar medallas automáticamente al completar tareas
async function asignarMedallaPorTarea(req, res) {
    const { estudianteId, tareaId } = req.body;
    try {
        const estudiante = await Estudiante.findByPk(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Lógica para determinar la medalla según la tarea completada
        const medalla = await Medalla.findOne({ where: { tipo: 'tarea', referencia: tareaId } });
        if (!medalla) {
            return res.status(404).json({ message: 'Medalla no encontrada para esta tarea' });
        }

        await estudiante.addMedalla(medalla);
        res.json({ message: 'Medalla asignada correctamente por completar la tarea' });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar la medalla por tarea', error });
    }
}

module.exports = { 
    getTradingData, 
    getAuditoriaData, 
    getEmocionalData,
    getFaseActual,
    updateFase,
    listAlumnosByFase,
    processImageForManagement,
    asignarMedalla,
    asignarMedallaPorTarea
};
