const express = require('express');
const router = express.Router();
const { Plan } = require('../models/database');

// Obtener todos los planes
router.get('/', async (req, res) => {
  try {
    const planes = await Plan.findAll();
    res.status(200).json(planes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los planes.' });
  }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, informacion, precio, linkPago } = req.body;

    const plan = await Plan.findByPk(id);
    if (!plan) return res.status(404).json({ error: 'Plan no encontrado.' });

    plan.titulo = titulo;
    plan.informacion = informacion;
    plan.precio = precio;
    plan.linkPago = linkPago;
    await plan.save();

    res.status(200).json({ message: 'Plan actualizado correctamente.', plan });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el plan.' });
  }
});

module.exports = router;
