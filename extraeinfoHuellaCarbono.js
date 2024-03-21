const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function extrae_infoHuellaCarbono(item_id) {
    //Declaracion del query de GraphQL que extrae la info requerida del item que se manda el webhook
    let query = `query {
        items (ids:${item_id}) {
            column_values {
                text
                id
                type
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
  
          let poblacionObjetivo, nombreProveedor,idElemento, descripcionProyecto, problematica, alcance, certificado, entidadCertificadora, avancesCertificacion, linkCertificado,montoMin, costoxbonocreditom3, fondearUnidades, indicadorImpacto, procedimientoMedicion, resultadosImpacto, presentacion, costoProyecto, duracionProyecto, fotos, categorias, ubicacion, ods, kpisImpacto =  "";
  
          result.forEach(obj => {
            // Asignar los valores a las variables dependiendo del id
            if (obj.id === "texto47") {
              poblacionObjetivo = obj.text;
            };
            if (obj.id === "men__desplegable") {
                nombreProveedor = obj.text;
              };
            if (obj.id === "text") {
              descripcionProyecto = obj.text;
            };
            if (obj.id === "text9") {
              problematica = obj.text;
            };
            if (obj.id === "text3") {
              solucion = obj.text;
            };
            if (obj.id === "n_meros5") {
              costoxvoluntario = obj.text;
            };
            if (obj.id === "numeric") {
              min_voluntarios = obj.text;
            };
            if (obj.id === "n_meros2") {
              max_voluntarios = obj.text;
            };
            if (obj.id === "texto22") {
              fechasImplementacion = obj.text;
            };
            if (obj.id === "selecci_n_m_ltiple") {
              queIncluye = obj.text;
            };
            if (obj.id === "n_meros3") {
              numPersonasImpactadas = obj.text;
            };
            if (obj.id === "enlace0") {
              fotos = obj.text;
            };
            if (obj.id === "men__desplegable97") {
              categorias = obj.text;
            };
            if (obj.id === "men__desplegable4") {
              ubicacion = obj.text;
            };
            if (obj.id === "men__desplegable3") {
              ods = obj.text;
            };
            if (obj.id === "men__desplegable1") {
              kpisImpacto = obj.text;
            };
            if (obj.id === "texto46") {
              recursosAdicionales = obj.text;
            };
            if (obj.id === "texto96") {
                duracionVoluntariado = obj.text;
              };
              if (obj.id === "id__de_elemento") {
                idElemento = obj.text;
              };
          });
  
          // Resolver la promesa con un objeto que contiene las variables asignadas
          resolve({ poblacionObjetivo, nombreProveedor,idElemento, descripcionProyecto, problematica, alcance, certificado, entidadCertificadora, avancesCertificacion, linkCertificado,montoMin, costoxbonocreditom3, fondearUnidades, indicadorImpacto, procedimientoMedicion, resultadosImpacto, presentacion, costoProyecto, duracionProyecto, fotos, categorias, ubicacion, ods, kpisImpacto });
        })
        .catch(error => {
          // Rechazar la promesa en caso de error
          reject(error);
        });
    });
  }
  
  module.exports = extrae_infoHuellaCarbono;
  