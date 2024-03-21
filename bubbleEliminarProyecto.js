const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function eliminarProyecto(item_id) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.URL_BUBBLE_PROD}/Proyectos/${item_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN_BUBBLE}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json();
      })
      .then(data => {
        // Verificar si el proyecto ya existe
        const proyectoExistente = data.response.results.find(project => project.NombreProyecto === nombreProyecto);
        if (proyectoExistente) {
          reject('El proyecto ya existe');
        } else {
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  module.exports =  eliminarProyecto;
  

  

