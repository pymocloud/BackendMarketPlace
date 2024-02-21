const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo RecursosAdicionales
const RecursosAdicionales = sequelize.define('RecursosAdicionales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
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

module.exports =  RecursosAdicionales;
