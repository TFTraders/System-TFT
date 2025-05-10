const { TPTModel } = require('../models/TPTModel');

const getTPTModules = async (req, res) => {
  try {
    const modules = await TPTModel.findAll();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los módulos de TPT' });
  }
};

const getEmotionalRegistry = async (req, res) => {
  try {
    const { usuario_id, emociones, análisis } = req.body;
    const registry = await TPTModel.createEmotionalRegistry(usuario_id, emociones, análisis);
    res.status(201).json(registry);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el registro emocional' });
  }
};

const saveProgress = async (req, res) => {
  try {
    const { usuario_id, modulo, estado } = req.body;
    const progress = await TPTModel.saveProgress(usuario_id, modulo, estado);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el progreso' });
  }
};

module.exports = { getTPTModules, getEmotionalRegistry, saveProgress };
