const express = require('express');
const router = express.Router();

router.get('/estado', async (req, res) => {
  try {
    // Simulación de datos del sistema
    const estado = {
      usuariosActivos: 120,
      erroresDetectados: 2,
      rendimientoBot: 'Óptimo',
      auditoriasPendientes: 5,
    };

    res.status(200).json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado del sistema.' });
  }
});

module.exports = router;
