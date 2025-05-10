const { sequelize } = require('../models/database');
const { DataTypes } = require('sequelize');

const createTables = async () => {
  const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    rol: { type: DataTypes.STRING },
    contraseña_hash: { type: DataTypes.STRING },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  const Roles = sequelize.define('roles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
  });

  const Permisos = sequelize.define('permisos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    descripción: { type: DataTypes.STRING },
  });

  const UserPermissions = sequelize.define('user_permissions', {
    usuario_id: { type: DataTypes.INTEGER },
    permiso_id: { type: DataTypes.INTEGER },
  });

  const BotLogs = sequelize.define('bot_logs', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    acción: { type: DataTypes.STRING },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  const Plans = sequelize.define('plans', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    precio: { type: DataTypes.FLOAT },
    descripción: { type: DataTypes.STRING },
  });

  const ProgresoAlumnos = sequelize.define('progreso_alumnos', {
    usuario_id: { type: DataTypes.INTEGER },
    modulo: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fase_actual: { type: DataTypes.STRING }, // Nueva columna para fase actual
  });

  const ActividadesIA = sequelize.define('actividades_ia', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER },
    prompt: { type: DataTypes.STRING },
    respuesta: { type: DataTypes.STRING },
    aprobado: { type: DataTypes.BOOLEAN },
  });

  const RegistroEmocional = sequelize.define('registro_emocional', {
    usuario_id: { type: DataTypes.INTEGER },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    emociones: { type: DataTypes.JSON },
    análisis: { type: DataTypes.STRING },
  });

  const BotMetrics = sequelize.define('bot_metrics', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    par: { type: DataTypes.STRING },
    resultado: { type: DataTypes.FLOAT },
    estrategia: { type: DataTypes.STRING },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  await sequelize.sync({ force: true });
  console.log('Tablas creadas exitosamente.');
};

createTables();
