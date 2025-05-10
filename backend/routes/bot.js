const express = require('express');
const router = express.Router();

// Simulación de estrategias y alertas
let estrategias = [
  {
    id: 1,
    nombre: 'Estrategia de Soporte y Resistencia',
    descripcion: 'Compra en soporte, vende en resistencia.',
    zonaEsperada: 1.2500,
    margenAlerta: 0.0050, // Margen antes de llegar a la zona esperada
  },
];

let alertas = [];

// Obtener todas las estrategias
router.get('/estrategias', (req, res) => {
  res.status(200).json(estrategias);
});

// Crear una nueva estrategia
router.post('/estrategias', (req, res) => {
  const { nombre, descripcion, zonaEsperada, margenAlerta } = req.body;
  const nuevaEstrategia = {
    id: estrategias.length + 1,
    nombre,
    descripcion,
    zonaEsperada,
    margenAlerta,
  };
  estrategias.push(nuevaEstrategia);
  res.status(201).json({ message: 'Estrategia creada correctamente.', estrategia: nuevaEstrategia });
});

// Generar alertas basadas en estrategias
router.post('/alertas', (req, res) => {
  const { precioActual } = req.body;

  estrategias.forEach(estrategia => {
    const diferencia = Math.abs(estrategia.zonaEsperada - precioActual);
    if (diferencia <= estrategia.margenAlerta) {
      alertas.push({
        estrategia: estrategia.nombre,
        mensaje: `Alerta: El precio está cerca de la zona esperada (${estrategia.zonaEsperada}).`,
        precioActual,
        zonaEsperada: estrategia.zonaEsperada,
      });
    }
  });

  res.status(200).json({ message: 'Alertas generadas.', alertas });
});

// Obtener todas las alertas
router.get('/alertas', (req, res) => {
  res.status(200).json(alertas);
});

module.exports = router;
