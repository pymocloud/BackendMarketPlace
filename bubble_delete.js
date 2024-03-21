const buscarProyecto= require("./bubbleBuscaProyecto");
const eliminarProyecto = require("./bubbleEliminarProyecto");

function buscarYEliminarProyecto(nombreProyecto) {
    return new Promise((resolve, reject) => {
      buscarProyecto(nombreProyecto)
        .then(proyectoID => {
          // Si el proyecto existe, eliminarlo
          eliminarProyecto(proyectoID)
            .then(() => {
              resolve(`El proyecto con ID ${proyectoID} ha sido eliminado.`);
            })
            .catch(error => {
              reject(`Error al eliminar el proyecto: ${error}`);
            });
        })
        .catch(error => {
          reject(`Error al buscar el proyecto: ${error}`);
        });
    });
  }
  
  module.exports = buscarYEliminarProyecto;
  
  
  