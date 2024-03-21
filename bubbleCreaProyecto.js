const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function crearProyecto(data) {
  return new Promise((resolve, reject) => {
    const url = `${process.env.URL_BUBBLE_PROD}/Proyectos`;
    const token = process.env.TOKEN_BUBBLE;
    
    fetch(url, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error de red');
      }
      return response.json();
    })
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  });
}


module.exports=crearProyecto;