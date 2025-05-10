const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Auditoria = sequelize.define('Auditoria', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    resultado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Auditoria;
