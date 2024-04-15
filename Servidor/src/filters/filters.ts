import { CustomData } from "../data-structure/CustomData"

export const filterTwo = (input: CustomData): CustomData => {
    let result : number = input.cedula.length
    if(result < 7 || result > 8 || input.cedula[0] == "0"){
        throw new Error("Largo y comienzo inválido")
    }
    return {nombre : input.nombre, apellido : input.apellido, cedula : input.cedula, telefono : input.telefono, departamento : input.departamento, necesita_asistencia_movilidad : input.necesita_asistencia_movilidad}
}