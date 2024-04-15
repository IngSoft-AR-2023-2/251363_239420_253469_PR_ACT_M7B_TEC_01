
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
//import { toLowercaseWithSpaces, toUppercase, replaceSpacesWithDots, filterWithRandomError } from './filters/filters';
import { CustomData } from './data-structure/CustomData';
import { filter1, filter2, filter3, filter4 } from './filters/filters';
//import {generateRandomWord, generateTests} from './Generator';
//const faker = require('faker'); // o import faker from 'faker';
const fs = require('fs');
require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json()); // Middleware para parsear JSON
const port = 3000;



// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<CustomData>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline<CustomData>([filter1, filter2, filter3, filter4], queueFactory);

pipeline.on('finalOutput', (data: CustomData) => {
    console.log(`Ha finalizado de agendarse ${data.nombre} ${data.apellido}`);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', ({ error, data}: {error: Error, data: CustomData}) => {
    console.log(`No se pudo agendar a: ${data.nombre} ${data.apellido}`);
});


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

    if(!validateCustomData(customData)){
        res.status(400).send("Algún campo está vacío");
    } else {
        res.status(200).send("Se ha iniciado el proceso de agenda para la persona: " + customData.nombre + " " + customData.apellido);
        console.log(customData);
        pipeline.processInput(customData);
    }
});

app.listen(port, () => {
    console.log("App is running");
});