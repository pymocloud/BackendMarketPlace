const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

function extrae_infoFyD(item_id) {
  //Declaracion del query de GraphQL que extrae la info requerida del item que se manda el webhook
  let query = `query {
        items (ids:${item_id}) {
          column_values {
            text
            id
            type
          }
          assets {
            public_url
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
        console.log(res);
        const data = res.data.items[0];
        const fotos = res.data.items[0].assets
        let urlsArray = fotos.map(item => item.public_url);
  
        // Filtrar solo los objetos que tienen un id y un texto
        const idsAndTexts = data.column_values.filter(obj => obj.id && obj.text);
        // Extraer los ids y textos de los objetos filtrados
        const result = idsAndTexts.map(obj => ({ id: obj.id, text: obj.text }));

        let idElemento, beneficiarios, problema,descripcionProyecto, descripcion, solucion, historiaProyecto, osc, tipoProyecto, ods, costoProyecto, duracionProyecto, beneficiariosEsperados, categorias, estados, kpi, desglose, cronograma = "";

        result.forEach(obj => {
          // Asignar los valores a las variables dependiendo del id
          if (obj.id === "id__de_elemento") {
            idElemento = obj.text;
          };
          if (obj.id === "text") {
            beneficiarios = obj.text;
          };
          if (obj.id === "texto2") {
            descripcionProyecto = obj.text;
          };
          if (obj.id === "texto3") {
            problema = obj.text;
          };
          if (obj.id === "texto6") {
            descripcion = obj.text;
          };
          if (obj.id === "texto4") {
            solucion = obj.text;
          };
          if (obj.id === "texto33") {
            historiaProyecto = obj.text;
          };
          if (obj.id === "men__desplegable6") {
            osc = obj.text;
          };
          if (obj.id === "men__desplegable1") {
            tipoProyecto = obj.text;
          };
          if (obj.id === "n_meros") {
            costoProyecto = obj.text;
          };
          if (obj.id === "n_meros1") {
            duracionProyecto = obj.text;
          };
          if (obj.id === "n_meros0") {
            beneficiariosEsperados = obj.text;
          };
          if (obj.id === "dropdown9") {
            categorias = obj.text;
          };
          if (obj.id === "men__desplegable2") {
            ods = obj.text;
          };
          if (obj.id === "men__desplegable") {
            estados = obj.text;
          };
          if (obj.id === "men__desplegable7") {
            kpi = obj.text;
          };
          if (obj.id === "enlace") {
            desglose = obj.text;
          };
          if (obj.id === "enlace1") {
            cronograma = obj.text;
          };

        });

        // Resolver la promesa con un objeto que contiene las variables asignadas
        resolve({ idElemento, beneficiarios, problema,descripcionProyecto, descripcion, solucion, historiaProyecto, osc, tipoProyecto, ods, costoProyecto, duracionProyecto, beneficiariosEsperados, categorias, estados, kpi, desglose, cronograma, urlsArray });
      })
      .catch(error => {
        // Rechazar la promesa en caso de error
        reject(error);
      });
  });
}

module.exports = extrae_infoFyD;
