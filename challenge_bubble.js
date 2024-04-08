const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const extrae_infoVoluntariado = require('./extraeinfoVoluntariado');
const extrae_infoHuellaCarbono = require("./extraeinfoHuellaCarbono");
const extrae_infoFyD = require("./extraeInfoFyD");
const crearProyectoSiNoExiste = require("./bubble_post");
const buscarYEliminarProyecto = require("./bubble_delete");
const extrae_reportes = require("./extrae_reportes");
const crearReporte = require("./bubble_creaReporte");
const crearIntervencion = require("./bubble_creaIntervencion");
const extrae_cotizaciones = require('./extrae_cotizaciones');
const bubbleSubirCotizacion = require("./bubbleSubirCotizacion");
const {chatgpt_textos_largos, chatgpt_poblacionObjetivo }= require("./chatgpt_function");


app.use(bodyParser.json());
//Dentro de este post, se está haciendo la llamada al challenge referente a lo que se pulse para 
//posteriormente hacer el tratamiento de datos adecuados para subirlo finalmente a AWS
app.post("/", function (req, res) {

    let nombreProyecto = req.body.event.pulseName;
    let idItem = req.body.event.pulseId.toString();
    let estatus = req.body.event.value.label.text; //bandera "Listo" para subir los datos, "Eliminar" para borrar el registro de SQL
    boardId = req.body.event.boardId;
    console.log("-----------------------------------")
    console.log(boardId);
    console.log(estatus);
    console.log(idItem);
    console.log("Nombre del Proyecto ->", nombreProyecto);

    //Proyecto FyD
    if (boardId === 4974512948) {
        extrae_infoFyD(idItem).then(data => {
            if (estatus === "Listo") {
                // Ejemplo de uso Bubble:
                const bubble_datos = {
                    NombreProyecto: nombreProyecto,
                    BeneficiariosEsperados: data.beneficiariosEsperados,
                    Categorias: data.categorias.split(","),
                    costoProyecto: parseFloat(data.costoProyecto),
                    cronograma: data.desglose,
                    descripcionBeneficiarios: data.beneficiarios,
                    descripcionProyecto: data.descripcionProyecto,
                    desglose: data.cronograma,
                    duracionProyecto: parseInt(data.duracionProyecto),
                    historiaProyecto: data.historiaProyecto,
                    KPIs: data.kpi,
                    ods: data.ods.split(","),
                    poblacionObjetivo: data.beneficiarios,
                    problematica: data.problema,
                    proveedor: data.osc,
                    solucion: data.solucion,
                    tipoProyecto: data.tipoProyecto,
                    ubicacion: data.estados.split(","),
                    fotoProblema: data.urlsArray[0],
                    FotoProyecto: data.urlsArray[1],
                    fotoHistoriaProyecto: data.urlsArray[2],
                    masFotos: [data.urlsArray[3], data.urlsArray[4], data.urlsArray[5]]
                };


                crearProyectoSiNoExiste(bubble_datos) //Crea el proyecto en Bubble
                    .then(response => {
                        console.log("Proyecto creado:", response);
                    })
                    .catch(error => {
                        console.error("Error al crear el proyecto:", error);
                    });
            }
            if (estatus === "Eliminar") {
                console.log("Eliminar Proyecto")
                buscarYEliminarProyecto(nombreProyecto)
                    .then(resultado => {
                        console.log(resultado); // Imprime el mensaje de éxito
                    })
                    .catch(error => {
                        console.error(error); // Imprime el mensaje de error si ocurre alguno
                    });
            }

        }).catch(error => {
            console.error(error);
        })


    }
    //Proyecto Voluntariado
    if (boardId === 6032513983) {

    }

    //Proyecto Huella Carbono
    if (boardId === 6032513983) {

    }
    

    //Reportes y depositos
    if (boardId === 2638425341) {
        console.log("Reportes y depositos");
        extrae_reportes(idItem).then(data => {
            if (estatus === "Listo") {
                // Ejemplo de uso Bubble:
                const bubble_datos_intervencion = {
                    nombreIntervencion: data.nombreIntervencion,
                    madeBy: data.correo,
                    ubicacion: data.ubicacion.split(","),
                    fechaInicio: data.fechaInicio,
                    aliadoOperativo: data.aliadoOperativo,
                    descripcionProyecto: data.descripcionProyecto,
                    kpi: data.kpi,
                    montoDonado: parseFloat(data.montoDonado),
                    ods: data.ods.split(","),
                    problematica: data.problematica,
                    poblacionObjetivo: data.poblacionObjetivo
                };
                crearIntervencion(bubble_datos_intervencion) //Crea el proyecto en Bubble
                    .then(response => {
                        console.log("Intervencion creada:", response);
                    })
                    .catch(error => {
                        console.error("Error al crear intervención:", error);
                    });
                data.results_files.forEach(obj => {
                    bubble_datos_reportes = {
                        reporte: obj.url,
                        madeBy: bubble_datos_intervencion.madeBy,
                        NombreIntervencion: bubble_datos_intervencion.nombreIntervencion,
                        nombreReporte: obj.reporte,

                    };
                    console.log(bubble_datos_reportes)
                    crearReporte(bubble_datos_reportes) //Crea el proyecto en Bubble
                        .then(response => {
                            console.log("Reporte creado:", response);
                        })
                        .catch(error => {
                            console.error("Error al crear reporte:", error);
                        });
                });

            }
        });
    }
    //Cotizaciones
    if (boardId === 6229896000) {
        console.log("Cotizaciones");
        extrae_cotizaciones(idItem).then(data => {
            try {
                console.log(bubbleSubirCotizacion(data.idCotizacion, data.archivoCotizacion, data.proveedor));
                console.log("Alta exitosa de Cotizacion")
            }
            catch (error) {
                console.error('Ocurrio un error al subir la cotizacion', error.message);
            }
        });
    }

    res.status(200).send(req.body);
})

app.get('/', (req, res) => {
    res.send('Servidor Web desarrollo MARKETPLACE');
  })

server.listen(process.env.PORT , function () {
    console.log(`Express server listening on port ${process.env.PORT}`);
})
