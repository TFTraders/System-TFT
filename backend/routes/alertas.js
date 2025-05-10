const express = require('express');
const router = express.Router();
const { enviarAlertaTelegram } = require('../services/telegram');

// Simulación de estrategias
const estrategias = [
  {
    id: 1,
    nombre: 'Estrategia de Soporte y Resistencia',
    descripcion: 'Compra en soporte, vende en resistencia.',
    zonaEsperada: 1.2500,
    margenAlerta: 0.0050, // Margen antes de llegar a la zona esperada
  },
];

// Generar alertas basadas en el precio actual
router.post('/generar', (req, res) => {
  const { precioActual } = req.body;

  estrategias.forEach((estrategia) => {
    const diferencia = Math.abs(estrategia.zonaEsperada - precioActual);
    if (diferencia <= estrategia.margenAlerta) {
      const mensaje = `📢 *Alerta de Trading*\n\nEstrategia: ${estrategia.nombre}\nPrecio Actual: ${precioActual}\nZona Esperada: ${estrategia.zonaEsperada}\n\n¡Prepárate para operar!`;
      enviarAlertaTelegram(mensaje);
    }
  });

  res.status(200).json({ message: 'Alertas generadas y enviadas a Telegram.' });
});

module.exports = router;
