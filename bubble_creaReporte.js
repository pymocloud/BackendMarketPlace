function crearReporte(data) {
    return new Promise((resolve, reject) => {
      const url = 'https://tech-46415.bubbleapps.io/api/1.1/obj/Reportes';
      const token = '796ff724f5aff23e38b36690d96c77af';
  
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
  
  module.exports=crearReporte;