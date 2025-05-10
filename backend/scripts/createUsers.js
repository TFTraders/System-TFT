const { sequelize, User } = require('../models/database');

const createUsers = async () => {
  await sequelize.sync();

  const users = [
    { username: 'alumno_tft', password: 'tft123', role: 'Alumno TFT' },
    { username: 'alumno_tpt', password: 'tpt123', role: 'Alumno TPT' },
    { username: 'inversor', password: 'inversor123', role: 'Inversor' },
    { username: 'admin', password: 'admin123', role: 'Administrador' },
    { username: 'auditor', password: 'auditor123', role: 'Auditor PRO' },
  ];

  for (const user of users) {
    await User.findOrCreate({ where: { username: user.username }, defaults: user });
  }

  console.log('Usuarios creados correctamente.');
};

createUsers();
