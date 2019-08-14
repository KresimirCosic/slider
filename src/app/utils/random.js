const random = function(array) {
    let number = Math.floor(Math.random() * array.length + 1);
    return number;
}

export default random;