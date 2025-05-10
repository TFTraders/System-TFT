const { Networking } = require('../models/database');

const getNetworkingEvents = async (req, res) => {
  try {
    const events = await Networking.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos de networking.' });
  }
};

const createNetworkingEvent = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, enlace } = req.body;
    const nuevoEvento = await Networking.create({ titulo, descripcion, fecha, enlace });
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento de networking.' });
  }
};

module.exports = { getNetworkingEvents, createNetworkingEvent };
