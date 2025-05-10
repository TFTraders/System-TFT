const express = require('express');
const router = express.Router();

// Simulación de datos de auditoría
const tradersData = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    roi: '15%',
    drawdown: '5%',
    winrate: '60%',
    perfil: 'Trader conservador',
    alertas: ['Operación impulsiva detectada el 2025-01-10'],
    consejos: ['Practica mindfulness antes de operar.', 'Revisa tu plan de trading.'],
  },
  {
    id: 2,
    nombre: 'María López',
    roi: '25%',
    drawdown: '10%',
    winrate: '70%',
    perfil: 'Trader agresivo',
    alertas: [],
    consejos: ['Mantén un registro emocional diario.', 'Evita operar en sesiones largas.'],
  },
];

// Obtener datos de auditoría de un trader
router.get('/trader/:id', (req, res) => {
  const trader = tradersData.find(t => t.id === parseInt(req.params.id));
  if (!trader) {
    return res.status(404).json({ error: 'Trader no encontrado.' });
  }
  res.status(200).json(trader);
});

// Obtener todos los traders auditados
router.get('/traders', (req, res) => {
  res.status(200).json(tradersData);
});

module.exports = router;
