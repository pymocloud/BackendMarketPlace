const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo ProyectoVoluntariado
const ProyectoVoluntariado = sequelize.define('ProyectoVoluntariado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    solucion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    costoxVoluntario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    minvoluntarios: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    maxvoluntarios: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechasImplementacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    incluye: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    numPersonasImpactadas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duracionVoluntariado: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idItem: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  });



module.exports = ProyectoVoluntariado;