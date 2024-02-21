const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const ProyectoFilantropiaYDonaciones = require("./models/ProyectoFyD");
const Categorias = require("./models/Categorias");
const Fotos = require("./models/Fotos");
const ProyectoAmbiental = require("./models/HuellaAmbiental");
const KPIsImpacto = require("./models/KPIsImpacto");
const ODS = require("./models/ODS");
const Proyecto = require("./models/Proyecto");
const CompraBonosDeCarbono = require("./models/ProyectoHuellaCarbono");
const ProyectoVoluntariado = require("./models/ProyectoVoluntariado");
const RecursosAdicionales = require("./models/RecursosAdicionales");
const Ubicacion = require("./models/Ubicacion")
const extrae_infoVoluntariado = require('./extraeinfoVoluntariado');
const extrae_infoFyD = require("./extraeInfoFyD");
const { insertarODS, insertaEstados, insertakpisImpacto, insertaCategorias } = require("./funcionesAuxiliares");

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

    if (boardId === 4974512948) {
        console.log("Board Inventario en vivo");
        extrae_infoFyD(idItem).then(data => {
            console.log("-----------------------")
            const datosProyecto = {
                idItem: data.idElemento,
                nombreProyecto: nombreProyecto,
                nombreProveedor: data.osc,
                poblacionObjetivo: data.beneficiarios,
                tipoProyecto: data.tipoProyecto,
                descripcionProyecto: data.descripcion,
                problematica: data.problema,
            };
            const datosProyectoFyD = {
                solucion: data.solucion,
                historiaProyecto: data.historiaProyecto,
                costoProyecto: data.costoProyecto,
                duracionProyecto: data.duracionProyecto,
                numPersonasImpactadas: data.beneficiariosEsperados,
                idItem: data.idElemento
            };
            const datosFotos = {
                rutaArchivo: ''
            };
            const datosRecursosAdicionales = {
                descripcion: 'Cronograma',
                rutaArchivo: data.desglose
            };


            if (estatus === "Listo") {
                // Realiza la búsqueda del item al que se dio click, en caso de que se encuentre hace un update de los valores, de lo contrario, lo registra en la bd
                Proyecto.findOne({ where: { idItem: data.idElemento } })
                    .then(resultado => {
                        if (resultado) {
                            // El elemento ya existe
                            console.log('El elemento ya existe en la tabla:', resultado.toJSON());
                            //Eliminamos el registro en especifico de la tabla y lo volvemos a subir
                            Proyecto.destroy(({ where: { idItem: data.idElemento } }));
                            ProyectoFilantropiaYDonaciones.destroy(({ where: { idItem: data.idElemento } }));
                            ODS.destroy(({ where: { idItem: data.idElemento } }));
                            Ubicacion.destroy(({ where: { idItem: data.idElemento } }));
                            KPIsImpacto.destroy(({ where: { idItem: data.idElemento } }));
                            Categorias.destroy(({ where: { idItem: data.idElemento } }));
                            //E insertamos nuevamente los datos
                            Proyecto.create(datosProyecto);
                            ProyectoFilantropiaYDonaciones.create(datosProyectoFyD);
                            insertarODS(data.ods, data.idElemento);
                            insertaEstados(data.estados, data.idElemento);
                            insertakpisImpacto(data.kpi, data.idElemento);
                            insertaCategorias(data.categorias, data.idElemento);

                        } else {
                            // El elemento no existe
                            console.log('El elemento no existe en la tabla.')
                            Proyecto.create(datosProyecto);
                            ProyectoFilantropiaYDonaciones.create(datosProyectoFyD);
                            insertarODS(data.ods, data.idElemento);
                            insertaEstados(data.estados, data.idElemento);
                            insertakpisImpacto(data.kpi, data.idElemento);
                            insertaCategorias(data.categorias, data.idElemento);
                        }

                    })
                    .catch(error => {
                        console.error('Error al buscar el elemento:', error);
                    });
            } else {
                console.log("Borrar elemento");
                Proyecto.destroy(({ where: { idItem: data.idElemento } }));
                ProyectoFilantropiaYDonaciones.destroy(({ where: { idItem: data.idElemento } }));
                ODS.destroy(({ where: { idItem: data.idElemento } }));
                Ubicacion.destroy(({ where: { idItem: data.idElemento } }));
                KPIsImpacto.destroy(({ where: { idItem: data.idElemento } }));
                Categorias.destroy(({ where: { idItem: data.idElemento } }));

            }

        })
            .catch(error => {
                console.error(error);
            })

    }
    if (boardId === 6032513983) {
        console.log("Board Huella de Carbono");

    }
    if (boardId === 5800317593) {
        console.log("Board Voluntariado");
        extrae_infoVoluntariado(idItem).then(data => {
            console.log("-----------------------")
            const datosProyecto = {
                idItem: data.idElemento,
                nombreProyecto: nombreProyecto,
                nombreProveedor: data.nombreProveedor,
                poblacionObjetivo: data.poblacionObjetivo,
                tipoProyecto: 'Voluntariado',
                descripcionProyecto: data.descripcionProyecto,
                problematica: data.problematica,
            };
            const datosProyectoVoluntariado = {
                solucion: data.solucion,
                costoxVoluntario: data.costoxvoluntario,
                minvoluntarios: data.min_voluntarios,
                maxvoluntarios: data.max_voluntarios,
                fechasImplementacion: data.fechasImplementacion,
                incluye: data.queIncluye,
                numPersonasImpactadas: data.numPersonasImpactadas,
                duracionVoluntariado: data.duracionVoluntariado,
                idItem: data.idElemento
            };
           


            if (estatus === "Listo") {
                // Realiza la búsqueda del item al que se dio click, en caso de que se encuentre hace un update de los valores, de lo contrario, lo registra en la bd
                Proyecto.findOne({ where: { idItem: data.idElemento } })
                    .then(resultado => {
                        if (resultado) {
                            // El elemento ya existe
                            console.log('El elemento ya existe en la tabla:', resultado.toJSON());
                            //Eliminamos el registro en especifico de la tabla y lo volvemos a subir
                            Proyecto.destroy(({ where: { idItem: data.idElemento } }));
                            ProyectoVoluntariado.destroy(({ where: { idItem: data.idElemento } }));
                            ODS.destroy(({ where: { idItem: data.idElemento } }));
                            Ubicacion.destroy(({ where: { idItem: data.idElemento } }));
                            KPIsImpacto.destroy(({ where: { idItem: data.idElemento } }));
                            Categorias.destroy(({ where: { idItem: data.idElemento } }));
                            //E insertamos nuevamente los datos
                            Proyecto.create(datosProyecto);
                            ProyectoVoluntariado.create(datosProyectoVoluntariado);
                            insertarODS(data.ods, data.idElemento);
                            insertaEstados(data.ubicacion, data.idElemento);
                            insertakpisImpacto(data.KPIsImpacto, data.idElemento);
                            insertaCategorias(data.categorias, data.idElemento);

                        } else {
                            // El elemento no existe
                            console.log('El elemento no existe en la tabla.');
                            Proyecto.create(datosProyecto);
                            ProyectoVoluntariado.create(datosProyectoVoluntariado);
                            insertarODS(data.ods, data.idElemento);
                            insertaEstados(data.ubicacion, data.idElemento);
                            insertakpisImpacto(data.kpisImpacto, data.idElemento);
                            insertaCategorias(data.categorias, data.idElemento);


                        }
                    })
                    .catch(error => {
                        console.error('Error al buscar el elemento:', error);
                    });
            } else {
                //Eliminamos el registro en especifico de la tabla y lo volvemos a subir
                Proyecto.destroy(({ where: { idItem: data.idElemento } }));
                ProyectoVoluntariado.destroy(({ where: { idItem: data.idElemento } }));
                ODS.destroy(({ where: { idItem: data.idElemento } }));
                Ubicacion.destroy(({ where: { idItem: data.idElemento } }));
                KPIsImpacto.destroy(({ where: { idItem: data.idElemento } }));
                Categorias.destroy(({ where: { idItem: data.idElemento } }));
            }

        })
            .catch(error => {
                console.error(error);
            })

    }

    res.status(200).send(req.body);
})

server.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port 3000');
})