const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emocional = sequelize.define('Emocional', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estadoEmocional: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

const Medalla = sequelize.define('Medalla', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING, // Ejemplo: "aprendizaje" o "operativo"
        allowNull: false,
    },
    icono: {
        type: DataTypes.STRING, // Ruta del icono de la medalla
        allowNull: true,
    },
});

module.exports = { Emocional, Medalla };
