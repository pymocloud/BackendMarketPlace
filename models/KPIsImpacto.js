const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

const KPIsImpacto = sequelize.define('KPIsImpacto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcionKPI: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idItem: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
  });

  
  module.exports = KPIsImpacto;