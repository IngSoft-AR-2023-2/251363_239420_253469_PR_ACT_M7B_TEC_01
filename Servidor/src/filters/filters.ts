import { CustomData } from "../data-structure/CustomData";


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

    //check that input.departamento este en el array de dep sin importar mayuscula o minuscula
    const inputDep = input.departamento.toLowerCase();
    const isInArray = dep.some(depName => depName.toLowerCase() === inputDep);

    if(!isInArray) throw new Error("El departamento no es valido")

    return input;
}