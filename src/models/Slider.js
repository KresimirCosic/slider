import $ from 'jquery';
import Slide from './Slide';
import { log } from '../utility';

class Slider {
    constructor(id, margin = 10, images) {
        this.id = id;
        this.margin = margin;
        this.images = images;
        this.animationDuration = 350;

        // Reference to the jQuery element object being passed through the constructor
        // this.element = $(`#${id}`);

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

Slider.prototype.createSlide = function(name) {
    let slide = new Slide(name).create();
    return slide;
}

Slider.prototype.prependSlide = function(slide, initialPosition = null) {
    let element = $(`#${this.id}`);
    element.prepend(slide);

    if(initialPosition != null) {
        $(slide).css('right', initialPosition);
        $(slide).css('right', 0);
    }
}

Slider.prototype.appendSlide = function(slide, initialPosition = null) {
    let element = $(`#${this.id}`);
    element.append(slide);

    if(initialPosition != null) {
        $(slide).css('right', initialPosition);

        // Adjusting from initial to target offset - in other words, animating
        let slideWidth = $(slide)[0].clientWidth;
        $(slide).css('right', initialPosition - slideWidth);
    }
}

Slider.prototype.populateSlider = function() {
    let { images } = this;

    for(let image of images) {
        let slide = this.createSlide(image);
        this.appendSlide(slide);
    }

    this.positionSlides();
}

Slider.prototype.positionSlides = function() {
    let { margin } = this;
    let element = $(`#${this.id}`);
    let slides = element.children();
    
    slides.each(function(index) {
        // Waiting for images to load before proceeding positioning
        $(this.firstChild).on('load', function() {
            let totalPreviousImagesWidth = 0;
            let slideOffset = index * margin;

            for (let i = 0; i < index; i++) {
                totalPreviousImagesWidth += element.children()[i].clientWidth;
            }

            $(this).parent().css('right', slideOffset + totalPreviousImagesWidth);
        })
    })
}

Slider.prototype.slideBackwards = function() {
    let { margin, animationDuration } = this;
    let element = $(`#${this.id}`);
    let slides = element.children();
    let pattern = /-?\d+/g;

    let lastListItem = $(`#${this.id} li`).last();
    let amountToMove = lastListItem[0].clientWidth;

    slides.each(function() {
        let currentPosition = Number($(this).css('right').match(pattern));

        $(this).css('right', currentPosition + amountToMove + margin);
    });

    // Prepending the last image to the beginning of the slider (far right)
    let imageSource = lastListItem.children()[0].src;
    let slide = this.createSlide(imageSource);

    let positionOfPrependingSlide = 0 - amountToMove - margin;

    this.prependSlide(slide, positionOfPrependingSlide);

    setTimeout(() => {
        slides.last().remove();
    }, animationDuration);
}

Slider.prototype.slideForwards = function() {
    let { margin, animationDuration } = this;
    let element = $(`#${this.id}`);
    let slides = element.children();
    let pattern = /-?\d+/g;

    let firstListItem = $(`#${this.id} li`).first();
    let amountToMove = firstListItem[0].clientWidth;

    slides.each(function() {
        let currentPosition = Number($(this).css('right').match(pattern)[0]);

        $(this).css('right', currentPosition - amountToMove - margin);
    });

    // Appending the first image to the end of the slider (far left)
    let imageSource = firstListItem.children()[0].src;
    let slide = this.createSlide(imageSource);

    let positionOfAppendingSlide = 0;

    slides.each(function(index) {
        positionOfAppendingSlide += this.clientWidth;
    });

    this.appendSlide(slide, positionOfAppendingSlide + (slides.length - 1) * margin);

    setTimeout(() => {
        slides.first().remove();
    }, animationDuration);
}

export default Slider;