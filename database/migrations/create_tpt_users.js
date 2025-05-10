const { sequelize } = require('../../backend/models/database');
const { DataTypes } = require('sequelize');

const createTPTTables = async () => {
  await sequelize.define('tpt_users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER },
    perfil: { type: DataTypes.STRING },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  console.log('Tablas de TPT creadas exitosamente.');
};

createTPTTables();
