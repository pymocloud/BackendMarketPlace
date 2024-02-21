const {  DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define el modelo ProyectoAmbiental
const ProyectoAmbiental = sequelize.define('ProyectoAmbiental', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    alcance: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    certificado: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    entidadCertificadora: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AvancesCertificacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    linkPdfCertificado: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    montoMinimoProyecto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    costoxbonoCreditoM3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fondearUnidades: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IndicadorImpacto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ProcedimientoMedicionImpacto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resultadosImpacto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    linkPresentacion: {
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
    idItem: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  });

  module.exports = ProyectoAmbiental;