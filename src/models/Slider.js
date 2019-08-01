import $ from 'jquery';
import Slide from './Slide';
import { log } from '../functions';
import { rejects } from 'assert';

class Slider {
    constructor(id, margin, images) {
        this.id = id;
        this.margin = margin;
        this.images = images;

        // Reference to the jQuery element object being passed through the constructor
        this.element = $(`#${id}`);

        // Initializing slider
        this.init();
    }
}

Slider.prototype.init = function() {
    // Grabbing buttons that are going to control the slider
    $('#previous').click(() => this.slideBackwards());
    $('#next').click(() => this.slideForwards());

    // Populating slider
    this.populateSlider();
}

Slider.prototype.loadSlide = function(name) {
    let { element } = this;
    let slide = new Slide(name).create();
    element.append(slide);
}

Slider.prototype.populateSlider = function() {
    let { images } = this;

    for(let image of images) {
        this.loadSlide(image);
    }
}

Slider.prototype.slideBackwards = function() {
    
}

Slider.prototype.slideForwards = function() {
    
}

export default Slider;