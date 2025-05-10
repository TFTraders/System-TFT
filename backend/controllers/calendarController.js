const { CalendarEvents } = require('../models/database');

const createEvent = async (req, res) => {
  try {
    const { title, description, link, date, time } = req.body;

    // Crear un nuevo evento
    await CalendarEvents.create({ title, description, link, date, time });

    res.status(201).json({ message: 'Evento creado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento.' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await CalendarEvents.findAll({ order: [['date', 'ASC'], ['time', 'ASC']] });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos.' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el evento
    await CalendarEvents.destroy({ where: { id } });

    res.status(200).json({ message: 'Evento eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento.' });
  }
};

module.exports = { createEvent, getEvents, deleteEvent };
