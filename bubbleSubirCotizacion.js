const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function subirCotizacion(id, documento, proveedor) {
      fetch(`${process.env.URL_BUBBLE_PROD}/Cotizaciones/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN_BUBBLE}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Documento: documento, Proveedor: proveedor})
      })
    
  }


  module.exports =  subirCotizacion;
  

  

