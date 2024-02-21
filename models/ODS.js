const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo ODS
const ODS = sequelize.define('ODS', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ODS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
  });


  module.exports = ODS;
  