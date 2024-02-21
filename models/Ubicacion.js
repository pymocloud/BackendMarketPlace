const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo Ubicacion
const Ubicacion = sequelize.define('Ubicacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
  });

  module.exports=Ubicacion;