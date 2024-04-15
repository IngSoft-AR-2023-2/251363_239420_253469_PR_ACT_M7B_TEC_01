import { CustomData } from "../data-structure/CustomData"

export const filterTwo = (input: CustomData): CustomData => {
    let result : number = input.cedula.length
    if(result < 7 || result > 8 || input.cedula[0] == "0"){
        throw new Error("Largo y comienzo inválido")
    }
    return {nombre : input.nombre, apellido : input.apellido, cedula : input.cedula, telefono : input.telefono, departamento : input.departamento, necesita_asistencia_movilidad : input.necesita_asistencia_movilidad}
}
export const filter1 = (input: CustomData): CustomData => {
    let phone: string = input.telefono;
    phone = phone.replace(/\s/g, ''); //Remueve espacios
    if(phone.length === 9 && phone.startsWith('09')){
        return input;
    }
    else{
        throw new Error("El telefono no es valido");
    }
}
