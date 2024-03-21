const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function buscarProyecto(nombreProyecto) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.URL_BUBBLE_PROD}/Proyectos`, {
        method: 'GET',
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
          resolve(proyectoExistente._id);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  buscarProyecto("VE POR ELLAS 2024");

  module.exports =  buscarProyecto;
  

  

