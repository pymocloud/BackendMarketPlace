const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo Fotos
const Fotos = sequelize.define('Fotos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ruta_archivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
  });

module.exports = Fotos;
