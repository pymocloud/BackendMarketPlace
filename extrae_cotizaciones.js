const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function extrae_cotizaciones(item_id) {
    //Declaracion del query de GraphQL que extrae la info requerida del item que se manda el webhook
    let query = `query {
        items (ids:${item_id} ) {
          column_values {
            ... on MirrorValue {
                    display_value
                        column {
                            id
                            title  
                        }
                    id
                }
            text
            id
            type
          }
        }
      }`;

    // Crear una nueva promesa
    return new Promise((resolve, reject) => {
        // Realizar la consulta fetch
        fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.MONDAY_KEY,
                'apiVersion': '2023-10',
            },
            body: JSON.stringify({
                'query': query
            })
        })
            .then(res => res.json())
            .then(res => {
                const data = res.data.items[0];

                // Filtrar solo los objetos que tienen un id y un texto
                const idsAndTexts = data.column_values.filter(obj => obj.id && obj.text);
                // Extraer los ids y textos de los objetos filtrados
                const result = idsAndTexts.map(obj => ({ id: obj.id, text: obj.text }));
                let idCotizacion, archivoCotizacion, proveedor;
                result.forEach(obj => {
                    // Asignar los valores a las variables dependiendo del id
                    if (obj.id === "texto89") {
                        idCotizacion = obj.text;
                    };
                    if (obj.id === "texto1") {
                        archivoCotizacion = obj.text;
                    }
                    
                });
                proveedor = data.column_values[3].display_value;

                // Resolver la promesa con un objeto que contiene las variables asignadas
                resolve({ idCotizacion, archivoCotizacion, proveedor });
            })
            .catch(error => {
                // Rechazar la promesa en caso de error
                reject(error);
            });
    });
}

module.exports = extrae_cotizaciones;
