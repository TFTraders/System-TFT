const { sequelize } = require('../../backend/models/database');

const seedTPTData = async () => {
  const TPTModules = sequelize.models.tpt_modules;
  const TPTUsers = sequelize.models.tpt_users;

  // Insertar módulos de TPT
  await TPTModules.bulkCreate([
    { nombre: 'Gestión Operativa Avanzada', descripción: 'Trading intradía y swing', nivel: 1 },
    { nombre: 'Análisis Emocional', descripción: 'Control emocional y psicotrading', nivel: 2 },
    { nombre: 'Estrategias Profesionales', descripción: 'Estrategias avanzadas con IA', nivel: 3 },
  ]);

  // Insertar usuarios de TPT con perfiles
  await TPTUsers.bulkCreate([
    { usuario_id: 1, perfil: 'Day Trader' },
    { usuario_id: 2, perfil: 'Swing Trader' },
    { usuario_id: 3, perfil: 'Position Trader' },
  ]);

  console.log('Datos iniciales de TPT insertados.');
};

seedTPTData();
