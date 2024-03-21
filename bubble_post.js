const buscarProyecto = require("./bubbleBuscaProyecto");
const crearProyecto = require("./bubbleCreaProyecto");
const actualizarProyecto = require("./bubbleActualizarProyecto");

// Función para crear el proyecto si no existe o actualizarlo si existe
function crearProyectoSiNoExiste(data) {
    return new Promise((resolve, reject) => {
        buscarProyecto(data.NombreProyecto)
            .then(proyectoID => {
                // Si el proyecto existe, actualizamos sus valores
                if (proyectoID) {
                    // Suponiendo que tienes una función para actualizar el proyecto
                    // Aquí se llama a la función para actualizar el proyecto con el ID y los nuevos datos
                    actualizarProyecto(proyectoID, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        });
                } else {
                    // El proyecto no existe, entonces lo creamos
                    crearProyecto(data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        });
                }
            })
            .catch(error => {
                // Manejar errores al buscar el proyecto
                reject(error);
            });
    });
}

module.exports = crearProyectoSiNoExiste;
