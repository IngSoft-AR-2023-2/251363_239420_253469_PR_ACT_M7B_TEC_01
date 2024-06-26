import axios from 'axios';

// Definición de la estructura CustomData
class CustomData {
    nombre: string;
    apellido: string;
    cedula: string;
    telefono: string;
    departamento: string;
    necesita_asistencia_movilidad: boolean;

    constructor(nombre: string, apellido: string, cedula: string, telefono: string, departamento: string, necesita_asistencia_movilidad: boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.telefono = telefono;
        this.departamento = departamento;
        this.necesita_asistencia_movilidad = necesita_asistencia_movilidad;
    }
}

// URL a la que se enviarán los datos
const apiUrl = 'http://localhost:3000';

// Lista de objetos CustomData harcodeados
const customDataList: CustomData[] = [
    new CustomData('Juan', 'Perez', '123456789', '12345678', 'Montevideo', true),
    new CustomData('Maria', 'Gonzalez', '987654321', '87654321', 'Canelones', false), //No empieza con 09
    new CustomData('Pedro', 'Rodriguez', '01234567', '6543210', 'Maldonado', true), //El largo es menor a 9
    new CustomData('Ana', 'Lopez', '012345678', '091456789', 'Rocha', false), //Debe pasar
    new CustomData('Juan', 'Lopez', '01234567', '091456789', 'Rocha', false), // Arranca con 0
    new CustomData('Juan', 'Edelman', '123456780', '091456789', 'Rocha', false), // 9 caracteres en la cedula
    new CustomData('Juan', 'Edelman', '123456', '091456789', 'Rocha', false), // 6 caracteres en la cedula
    new CustomData('Juan', 'Edelman', '12345678', '091456789', 'Rocha', true), // 8 caracteres en la cedula
    new CustomData('Juan', 'Edelman', '1234567', '091456789', 'Rocha', false), // 7 caracteres en la cedula
    new CustomData('Juan', '', '1234567', '091456789', 'Rocha', false),
    new CustomData('Juan', 'Edelman', '1234567', '091456789', 'Peñarol', false),
    new CustomData('Juan', 'Edelman', '1234567', '', 'Rocha', false)
];

// Función para enviar un objeto CustomData al servidor
const sendCustomDataToApi = async (customData: CustomData) => {
    try {
        // Envía el objeto CustomData al servidor
        await axios.post(apiUrl, customData);
        console.log('Datos enviados correctamente:');
    } catch (error) {
        console.error('Error al enviar datos:');
    }
};

// Función para enviar cada objeto CustomData de la lista uno por uno
const sendCustomDataList = async () => {
    for (const customData of customDataList) {
        await sendCustomDataToApi(customData);
    }
};

// Inicia el proceso de envío
sendCustomDataList();