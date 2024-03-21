const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('marketPlace', 'admin', 'Israel206923818', {
  host: 'marketplace.cczbgbopshbe.us-east-1.rds.amazonaws.com',
  dialect: 'mysql'
});
/*sequelize.sync({alter: false});
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Se ha establecido la conexion con la base");
  } catch (error) {
    console.error("No se ha podido conectar con la base:", error);
  }
})();*/

module.exports = sequelize;



