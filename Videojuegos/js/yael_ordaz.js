/*
 * Example functions to practice JavaScript
 *
 * Yael Uriel Ordaz García
 * 2025-02-25
 */

"use strict";

function firstNonRepeating(str) {
    // crea un string vacio donde se guardaran los candidatos a ser el primer caracter no repetido
    const candidates = [];
    // recorre el string caracter por caracter
    for (let i = 0; i < str.length; i++) {
        //conpara
        let found = false;
        for (let cand of candidates) {
            if(cand.char == str[i]){
                cand.count+=1;
                found = true;
            }
        }
        if(!found){
            candidates.push({char: str[i], count: 1});
        }
    }
    console.log(candidates);
    for(let index in candidates){
        if(candidates[index].count == 1){
            return candidates[index].char;
        }
    }
    return undefined;
}

function bubbleSort(arr) {
    // caso base: si el arreglo tiene 0 o 1 elementos, ya está ordenado
    if (arr.length <= 1) {
        return arr;
    }
    // bandera para verificar si se hicieron intercambios
    let swapped;
    do {
        swapped = false;
        // recorre el arreglo comparando elementos adyacentes
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // si el elemento actual es mayor que el siguiente, los intercambia
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true; // se hizo un intercambio
            }
        }
    } while (swapped); // repite el proceso hasta que no se hagan intercambios
    console.log(arr);
    return arr;
}

function invertArray(arr) {
    // crea un nuevo arreglo para almacenar los elementos invertidos
    const invert = [];
    // recorre el arreglo original desde el final hasta el principio y agrega cada elemento al nuevo arreglo
    for (let i = arr.length - 1; i >= 0; i--) {
        invert.push(arr[i]);
    }
    console.log(invert);
    return invert;
}

function invertArrayInplace(arr) {
    // recorre el arreglo hasta la mitad
    for (let i = 0; i < arr.length / 2; i++) {
        // intercambia el elemento actual con el elemento correspondiente desde el final
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }
    console.log(arr);
    return arr;
}

function capitalize(str) {
    // crea un nuevo string para almacenar el resultado
    let capitalized = "";
    // recorre el string caracter por caracter
    for (let i = 0; i < str.length; i++) {
        // si el caracter es un espacio, agrega un espacio al resultado
        if (str[i] === " ") {
            capitalized += " ";
        } else if (i === 0 || str[i - 1] === " ") {
            // si el caracter es la primera letra de una palabra, lo convierte a mayúscula
            capitalized += str[i].toUpperCase();
        } else {
            // si el caracter no es la primera letra de una palabra, lo convierte a minúscula
            capitalized += str[i].toLowerCase();
        }
    }
    console.log(capitalized);
    return capitalized;
}

function mcd(a, b) {
    // caso base: si a es 0, el mcd es b; si b es 0, el mcd es a
    if (a === 0) {
        console.log(b);
        return b;
    }
    if (b === 0) {
        console.log(a);
        return a;
    }
    // caso recursivo: el mcd de a y b es el mismo que el mcd de b y el resto de a dividido por b
    return mcd(b, a % b);
}

function hackerSpeak(str) {
    // crea un nuevo string para almacenar el resultado
    let hacker = "";
    // recorre el string caracter por caracter
    for (let i = 0; i < str.length; i++) {
        // reemplaza las letras por sus equivalentes en "hacker speak"
        switch (str[i]) {
            case "a":
                hacker += "4";
                break;
            case "e":
                hacker += "3";
                break;
            case "i":
                hacker += "1";
                break;
            case "o":
                hacker += "0";
                break;
            case "s":
                hacker += "5";
                break;
            default:
                hacker += str[i];
        }
    }
    console.log(hacker);
    return hacker;
}

function factorize(num) {
    // crea un arreglo para almacenar los factores
    const factor = [];
    // recorre los números desde 1 hasta num
    for (let i = 1; i <= num; i++) {
        // si num es divisible por i, agrega i al arreglo de factores
        if (num % i === 0) {
            factor.push(i);
        }
    }
    console.log(factor);
    return factor;
}

function deduplicate(arr) {
    // crea un nuevo arreglo para almacenar los elementos únicos
    const unique = [];
    // recorre el arreglo original
    for (let i = 0; i < arr.length; i++) {
        // si el elemento actual no está en el arreglo de elementos únicos, lo agrega
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    console.log(unique);
    return unique;
}

function findShortestString(arr) {
    // caso base: si el arreglo está vacío, devuelve 0
    if (arr.length === 0) {
        return 0;
    }
    // inicializa la longitud mínima con la longitud del primer string
    let ml = arr[0].length;
    // recorre el arreglo de strings
    for (let i = 1; i < arr.length; i++) {
        // si la longitud del string actual es menor que la longitud mínima, actualiza la longitud mínima
        if (arr[i].length < ml) {
            ml = arr[i].length;
        }
    }
    console.log(ml);
    return ml;
}

function isPalindrome(str) {
    // elimina los espacios y convierte el string a minúscula para ignorar diferencias de mayúsculas y espacios 
    const Str0 = str.replace(/\s/g, "").toLowerCase();
    // compara el string limpio con su versión invertida
    //split("") convierte el string en un arreglo de caracteres, reverse() invierte el arreglo, y join("") vuelve a convertirlo en un string
    const isPalin = Str0 === Str0.split("").reverse().join("");
    console.log(isPalin);
    return isPalin;
}

function sortStrings(arr){
    // string vacio para almacenar el resultado
    let sorted = "";
    // utiliza el algoritmo de bubble sort para ordenar los strings alfabéticamente
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - 1 - i; j++){
            //toLowerCase() convierte ambos strings a minúscula para comparar sin importar mayúsculas o minúsculas
            if(arr[j].toLowerCase() > arr[j + 1].toLowerCase()){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            sorted = arr.join(", ");
        }
    }
    console.log(sorted);
    return arr;
} 

function stats(arr){
    // arreglo para almacenar los resultados
    let lista = [];
    // caso base: si el arreglo está vacío, devuelve [0, 0]
    if(arr.length === 0){
        lista.push(0, 0);
        return lista;
    }
    // si el arreglo solo tiene un elemento, la media es ese elemento y la moda es ese elemento
    if(arr.length === 1){
        lista.push(arr[0], arr[0]);
        console.log(lista);
        return lista;
    }
    // calcula la media sumando todos los elementos y dividiendo por la cantidad de elementos
    // para calcular la moda, recorre el arreglo y cuenta cuántas veces aparece cada elemento
    for(let i = 0; i < arr.length; i++){
        let count = 0;
        for(let j = 0; j < arr.length; j++){
            if(arr[i] === arr[j]){
                count++;
            }
        }
        if(count > 1){
            lista.push(arr.reduce((a, b) => a + b) / arr.length, arr[i]);
            console.log(lista);
            return lista;
        }
    }
    // si no hay moda, devuelve la media y el primer elemento del arreglo como moda
    lista.push(arr.reduce((a, b) => a + b) / arr.length, arr[0]);
    console.log(lista);
    return lista;
}

function popularString(arr){
    // caso base: si el arreglo está vacío, devuelve una cadena vacía
    if(arr.length === 0){
        return "";
    }
    let popular = arr[0]; // inicializa la cadena más popular con el primer elemento del arreglo
    let maxCount = 1; // inicializa el conteo máximo con 1
    // recorre el arreglo y cuenta cuántas veces aparece cada cadena
    for(let i = 0; i < arr.length; i++){
        let count = 0;
        for(let j = 0; j < arr.length; j++){
            if(arr[i] === arr[j]){
                count++;
            }
        }
        // si el conteo de la cadena actual es mayor que el conteo máximo, actualiza la cadena más popular y el conteo máximo
        if(count > maxCount){
            popular = arr[i];
            maxCount = count;
        }
    }
    // si no hay un string que se repita, devuelve el primer string del arreglo
    console.log(popular);
    return popular;
}

function isPowerOf2(num){
    //ciclo que multiplica i por 2 en cada iteración, comenzando desde 1, hasta que i sea menor o igual a num
    for(let i = 1; i <= num; i *= 2){
        if(i === num){
            console.log(true);
            return true; // si i es igual a num, entonces num es una potencia de 2 y devuelve true
        }
    }
    // si el ciclo termina sin encontrar una potencia de 2 igual a num, devuelve false
    console.log(false);
    return false;
}

function sortDescending(arr){
    // utiliza el algoritmo de bubble sort para ordenar los números en orden descendente
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - 1 - i; j++){
            if(arr[j] < arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    console.log(arr);
    return arr;
}

export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};
