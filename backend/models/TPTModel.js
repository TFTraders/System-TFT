const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

const TPTModel = sequelize.define('tpt_modules', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING },
  descripción: { type: DataTypes.STRING },
  nivel: { type: DataTypes.INTEGER },
});

const EmotionalRegistry = sequelize.define('emotional_registry', {
  usuario_id: { type: DataTypes.INTEGER },
  emociones: { type: DataTypes.JSON },
  análisis: { type: DataTypes.STRING },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Progress = sequelize.define('progress', {
  usuario_id: { type: DataTypes.INTEGER },
  modulo: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = { TPTModel, EmotionalRegistry, Progress };
