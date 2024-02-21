const ODS = require("./models/ODS");
const Ubicacion = require("./models/Ubicacion");
const KPIsImpacto = require("./models/KPIsImpacto");
const Categorias = require("./models/Categorias");

function insertarODS(ods, idElemento) {
    try {
        //Primero necesitamos hacer el split de las , para pasarlo a array
        const arrayElementos = ods.split(",");

        for (let i = 0; i < arrayElementos.length; i++) {
            const elemento = arrayElementos[i];
            ODS.create({ ODS: elemento, idItem: idElemento });
            console.log(`Elemento ${elemento} insertado correctamente.`);
        }
        console.log('Todos los elementos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar elementos:', error);
    }
}


function insertaEstados(estados, idElemento){
    try {
        //Primero necesitamos hacer el split de las , para pasarlo a array
        const arrayElementos = estados.split(",");

        for (let i = 0; i < arrayElementos.length; i++) {
            const elemento = arrayElementos[i];
            Ubicacion.create({ estado: elemento, idItem: idElemento });
            console.log(`Elemento ${elemento} insertado correctamente.`);
        }
        console.log('Todos los elementos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar elementos:', error);
    }
}

function insertakpisImpacto(kpis, idElemento){
    try {
        //Primero necesitamos hacer el split de las , para pasarlo a array
        const arrayElementos = kpis.split(",");

        for (let i = 0; i < arrayElementos.length; i++) {
            const elemento = arrayElementos[i];
            KPIsImpacto.create({ descripcionKPI: elemento, idItem: idElemento });
            console.log(`Elemento ${elemento} insertado correctamente.`);
        }
        console.log('Todos los elementos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar elementos:', error);
    }
}

function insertaCategorias(categorias, idElemento){
    try {
        //Primero necesitamos hacer el split de las , para pasarlo a array
        const arrayElementos = categorias.split(",");

        for (let i = 0; i < arrayElementos.length; i++) {
            const elemento = arrayElementos[i];
            Categorias.create({ categoria: elemento, idItem: idElemento });
            console.log(`Elemento ${elemento} insertado correctamente.`);
        }
        console.log('Todos los elementos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar elementos:', error);
    }
}


module.exports = {insertarODS, insertaEstados, insertakpisImpacto, insertaCategorias};