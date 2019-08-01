// Functions that help durig development or have general functionalities
import $ from 'jquery';

// Log
const log = function(arg) {
    console.log(arg);
}

// Return random number depending on length of given array
const random = function(array) {
    let number = Math.floor(Math.random() * array.length + 1);
    return number;
}

export { log, random };