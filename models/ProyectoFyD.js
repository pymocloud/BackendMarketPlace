const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo ProyectoFilantropiaYDonaciones
const ProyectoFilantropiaYDonaciones = sequelize.define('ProyectoFilantropiaYDonaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    solucion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    historiaProyecto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    costoProyecto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duracionProyecto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    numPersonasImpactadas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
});

module.exports = ProyectoFilantropiaYDonaciones;