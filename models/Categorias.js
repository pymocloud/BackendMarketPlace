const {  DataTypes } = require('sequelize');
const sequelize = require('../database');
const Proyecto = require("./Proyecto");

// Define el modelo Categorias
const Categorias = sequelize.define('Categorias', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
  });


  module.exports = Categorias;