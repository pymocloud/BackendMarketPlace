const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function extrae_reportes(item_id) {
    //Declaracion del query de GraphQL que extrae la info requerida del item que se manda el webhook
    let query = `query {
        items (ids: ${item_id}) {
              column_values{
                ... on MirrorValue {
                    display_value
                        column {
                            id
                            title  
                        }
                    id
                }
                ... on BoardRelationValue {
                    display_value
                  column {
                    id
                    title  
                  }
          }
            id
            text
          }
          subitems {
            name
            column_values {
              text
              id
            }
            assets {
                id
              public_url
              }
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
                //Variables que se regresaran como parte de la promesa
                let nombreIntervencion, correo, ubicacion, fechaInicio, poblacionObjetivo, problematica, descripcionProyecto, kpi, montoDonado, aliadoOperativo, ods;
                // Filtrar solo los objetos que tienen un id y un texto
                const idsAndTexts = data.column_values.filter(obj => obj.id && obj.text);
                // Extraer los ids y textos de los objetos filtrados
                const result = idsAndTexts.map(obj => ({ id: obj.id, text: obj.text }));

                result.forEach(obj => {
                    if (obj.id === "texto9") {
                        correo = obj.text;
                    };
                    if (obj.id === "men__desplegable1") {
                        ubicacion = obj.text;
                    };
                    if (obj.id === "long_text") {
                        kpi = obj.text;
                    };
                    if (obj.id === "dup__of_monto_bruto0") {
                        montoDonado = obj.text;
                    };
                    if (obj.id === "men__desplegable0") {
                        aliadoOperativo = obj.text;
                    };

                    if (obj.id === "fecha1") {
                        fechaInicio = obj.text;
                    };
                });
                ods = data.column_values[5].display_value;
                nombreIntervencion = data.column_values[1].display_value;
                poblacionObjetivo = data.column_values[2].display_value;
                problematica = data.column_values[3].display_value;
                descripcionProyecto = data.column_values[4].display_value;
                //Logica para extraer el respectivo reporte y su nombre
                const results_files = [];
                data.subitems.forEach(obj => {
                    nombreReporte = obj.name;
                    obj.column_values.forEach(obj => {
                        if (obj.id === "archivo") {
                            urlReporte = obj.text
                        }
                    })
                    results_files.push({
                        reporte: nombreReporte,
                        url: urlReporte,
                    });
                });

                // Resolver la promesa con un objeto que contiene las variables asignadas
                resolve({ aliadoOperativo, ods, nombreIntervencion, correo, ubicacion, fechaInicio, poblacionObjetivo, problematica, descripcionProyecto, kpi, montoDonado, results_files });
            })
            .catch(error => {
                // Rechazar la promesa en caso de error
                reject(error);
            });
    });
}


module.exports = extrae_reportes;
