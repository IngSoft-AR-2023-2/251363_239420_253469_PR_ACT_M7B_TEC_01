
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
//import { toLowercaseWithSpaces, toUppercase, replaceSpacesWithDots, filterWithRandomError } from './filters/filters';
import { CustomData } from './data-structure/CustomData';
//import {generateRandomWord, generateTests} from './Generator';
//const faker = require('faker'); // o import faker from 'faker';
const fs = require('fs');
require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json()); // Middleware para parsear JSON
const port = 3000;

app.listen(port, () => {
    console.log("App is running");
});

// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<CustomData>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline<CustomData>([/* Aca poner los filtros */], queueFactory);

function validateCustomData(customData: CustomData): boolean {
    for (const key of Object.keys(customData)) {
        if (customData[key as keyof CustomData] === "") {
            return false;
        }
    }
    return true;
}


// Ruta para recibir objetos CustomData y enviarlos al pipeline
app.post("/", (req : any, res : any) => {
    const customData: CustomData = req.body;

    if(validateCustomData(customData) === false){
        return res.status(400).send("Algún campo está vacío");
    }
    res.status(200).send("Se ha iniciado el proceso de agenda para la persona: " + customData.nombre + " " + customData.apellido);
    console.log(customData);
    pipeline.processInput(customData);
});

//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
    console.log(`Salida final: ${output.data}`);
    saveResult(output.data);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
    console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
    saveResult(data.data);
});

const saveResult = (result: string) => {
    const fileName = 'result.txt';
    fs.appendFile(fileName, result + '\n', (err: any) => {
        if (err) {
            console.error('Error al guardar el resultado:', err);
        } else {
            console.log('Resultado guardado en', fileName);
        }
    });
};

