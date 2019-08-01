import $ from 'jquery';
import { log } from '../functions';

class Slide {
    constructor(name) {
        this.name = name;
    }
}

Slide.prototype.create = function() {
    let { name } = this;
    let li = document.createElement('li');
    let image = document.createElement('img');

    image.src = name;
    li.append(image);

    return li;
}


export default Slide;