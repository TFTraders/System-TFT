const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

// PostgreSQL connection
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Modelos
const TPTModules = sequelize.define('tpt_modules', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING },
  descripción: { type: DataTypes.STRING },
  nivel: { type: DataTypes.INTEGER },
});

const TPTUsers = sequelize.define('tpt_users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER },
  perfil: { type: DataTypes.STRING },
  creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para comandos del bot
const BotCommands = sequelize.define('bot_commands', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  command: { type: DataTypes.STRING },
  response: { type: DataTypes.JSON },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, confirmed, executed
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para logs del bot
const BotLogs = sequelize.define('bot_logs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  action: { type: DataTypes.STRING },
  details: { type: DataTypes.JSON },
  result: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para gestionar múltiples bots
const Bots = sequelize.define('bots', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING, defaultValue: 'paused' }, // running, paused
  copyTrade: { type: DataTypes.BOOLEAN, defaultValue: false },
  configuracion: { type: DataTypes.JSON }, // Configuración específica del bot
  creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para registrar instalaciones de la PWA
const PWAInstall = sequelize.define('pwa_installs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userAgent: { type: DataTypes.STRING },
  installedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para historial de notificaciones
const NotificationHistory = sequelize.define('notification_history', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
  sentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para comandos de la IA General
const GeneralAICommands = sequelize.define('general_ai_commands', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  command: { type: DataTypes.STRING },
  response: { type: DataTypes.TEXT },
  executedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para notificaciones programadas
const ScheduledNotifications = sequelize.define('scheduled_notifications', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  time: { type: DataTypes.TIME },
  repeat: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para eventos del calendario
const CalendarEvents = sequelize.define('calendar_events', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  link: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  time: { type: DataTypes.TIME },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para Consultoría
const Consultoria = sequelize.define('consultoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario: { type: DataTypes.STRING },
  tema: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Modelo para Networking
const Networking = sequelize.define('networking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.TEXT },
  fecha: { type: DataTypes.DATE },
  enlace: { type: DataTypes.STRING },
});

// Modelo para Planes
const Plan = sequelize.define('Plan', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  informacion: { type: DataTypes.TEXT, allowNull: false },
  precio: { type: DataTypes.STRING, allowNull: false },
  linkPago: { type: DataTypes.STRING, allowNull: false },
});

// Relaciones
TPTUsers.belongsTo(TPTModules, { foreignKey: 'modulo_id' });
BotCommands.belongsTo(Bots, { foreignKey: 'bot_id' });
BotLogs.belongsTo(Bots, { foreignKey: 'bot_id' });

module.exports = { sequelize, mongoose, TPTModules, TPTUsers, BotCommands, BotLogs, Bots, PWAInstall, NotificationHistory, GeneralAICommands, ScheduledNotifications, CalendarEvents, Consultoria, Networking, Plan };
