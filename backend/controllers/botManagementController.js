const { Bots } = require('../models/database');

const createBot = async (req, res) => {
  try {
    const { nombre, configuracion } = req.body;
    const bot = await Bots.create({ nombre, configuracion });
    res.status(201).json({ message: 'Bot creado exitosamente.', bot });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el bot.' });
  }
};

const updateBot = async (req, res) => {
  try {
    const { id } = req.params;
    const { configuracion } = req.body;
    const bot = await Bots.update({ configuracion }, { where: { id } });
    res.status(200).json({ message: 'Configuración del bot actualizada.', bot });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el bot.' });
  }
};

const toggleBotState = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Bots.findByPk(id);
    if (!bot) return res.status(404).json({ error: 'Bot no encontrado.' });

    bot.estado = bot.estado === 'running' ? 'paused' : 'running';
    await bot.save();

    res.status(200).json({ message: `Bot ${bot.estado === 'running' ? 'iniciado' : 'pausado'}.`, bot });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del bot.' });
  }
};

const toggleCopyTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Bots.findByPk(id);
    if (!bot) return res.status(404).json({ error: 'Bot no encontrado.' });

    bot.copyTrade = !bot.copyTrade;
    await bot.save();

    res.status(200).json({ message: `CopyTrade ${bot.copyTrade ? 'activado' : 'desactivado'}.`, bot });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado de CopyTrade.' });
  }
};

module.exports = { createBot, updateBot, toggleBotState, toggleCopyTrade };
