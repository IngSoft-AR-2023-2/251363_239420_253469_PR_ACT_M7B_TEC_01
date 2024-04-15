import { CustomData } from "../data-structure/CustomData"

export const filter4 = (input: CustomData): CustomData => {
    if(input.necesita_asistencia_movilidad){
        console.log(`La persona ${input.nombre} ${input.apellido} necesita asistencia en movilidad`);
    }
    else {
        console.log(`La persona ${input.nombre} ${input.apellido} sera agendada en el proceso común`);
    }
    return input;
}

export const filter3 = (input: CustomData): CustomData => {
    const dep = [
        "Artigas",
        "Canelones",
        "Cerro Largo",
        "Colonia",
        "Durazno",
        "Flores",
        "Florida",
        "Lavalleja",
        "Maldonado",
        "Montevideo",
        "Paysandu",
        "Rio negro",
        "rivera",
        "rocha",
        "salto",
        "san jose",
        "soriano",
        "tacuarembo",
        "treinta y tres"
    ]

    const inputDep = input.departamento.toLowerCase();
    const isInArray = dep.some(depName => depName.toLowerCase() === inputDep);

    if(!isInArray) throw new Error("El departamento no es valido")

    return input;
}

export const filter2 = (input: CustomData): CustomData => {
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
