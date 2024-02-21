const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo Proyecto
const Proyecto = sequelize.define('Proyecto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idItem: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    nombreProyecto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nombreProveedor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    poblacionObjetivo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipoProyecto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descripcionProyecto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    problematica: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

module.exports = Proyecto;