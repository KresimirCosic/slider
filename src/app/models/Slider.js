// import $ from 'jquery';
import Slide from './Slide';
import $ from 'jquery';

function importAll(r) {
  return r.keys().map(r);
}
// Getting all images of set formats (listed in webpack.config.js) that are located in the /src/assets folder via Webpack
const buttonImages = importAll(
  require.context('../../assets/utility', false, /\.(png|jpg|jpeg|gif)$/)
);

class Slider {
  constructor(id, images, margin = 5) {
    this.id = id;
    this.margin = margin;
    this.images = images;
    this.animationDuration = 350;
    this.imagesLoaded = false;

    // Initializing slider
    this.init();

    // Since images are changing dimensions during some breakpoints, the sliders need adjustments with their image positionings as well
    $(window).on('resize', () => {
      this.positionSlides();
    });
  }
}

Slider.prototype.init = function() {
  // Grabbing buttons that are going to control the slider
  $('#previous').click(() => this.slideBackwards());
  $('#next').click(() => this.slideForwards());

  $('#previous').css('background-image', `url(${buttonImages[0]})`);
  $('#next').css('background-image', `url(${buttonImages[1]})`);

  // Populating slider
  this.populateSlider();
};

Slider.prototype.createSlide = function(name) {
  let slide = new Slide(name).create();
  return slide;
};

Slider.prototype.prependSlide = function(slide, initialPosition = null) {
  let element = $(`#${this.id}`);
  element.prepend(slide);

  if (initialPosition != null) {
    $(slide).css('right', initialPosition);
    // Waiting for image to load to start sliding / still looks weird sometimes if the image takes little longer to load
    $(slide)
      .children()
      .on('load', function() {
        $(slide).css('right', 0);
      });
  }
};

Slider.prototype.appendSlide = function(slide, initialPosition = null) {
  let element = $(`#${this.id}`);
  element.append(slide);

  if (initialPosition != null) {
    $(slide).css('right', initialPosition);

    // Adjusting from initial to target offset - in other words, animating
    let slideWidth = $(slide)[0].clientWidth;
    $(slide).css('right', initialPosition - slideWidth);
  }
};

Slider.prototype.populateSlider = function() {
  let { images } = this;

  for (let image of images) {
    let slide = this.createSlide(image);
    this.appendSlide(slide);
  }

  this.positionSlides();
};

Slider.prototype.positionSlides = function() {
  let { margin } = this;
  let element = $(`#${this.id}`);
  let slides = element.children();

  if (!this.imagesLoaded) {
    slides.each(function(index) {
      // Waiting for images to load before proceeding positioning
      $(this.firstChild).on('load', function() {
        let totalPreviousImagesWidth = 0;
        let slideOffset = index * margin;

        for (let i = 0; i < index; i++) {
          totalPreviousImagesWidth += element.children()[i].clientWidth;
        }

        $(this)
          .parent()
          .css('right', slideOffset + totalPreviousImagesWidth);
      });
    });
    this.imagesLoaded = true;
  } else {
    // Updating the positions upon resizing the window - I guess useful when turning mobile view from horizontal to vertical and vice versa
    slides.each(function(index) {
      let totalPreviousImagesWidth = 0;
      let slideOffset = index * margin;

      for (let i = 0; i < index; i++) {
        totalPreviousImagesWidth += element.children()[i].clientWidth;
      }

      $(this).css('right', slideOffset + totalPreviousImagesWidth);
    });
  }
};

Slider.prototype.slideBackwards = function() {
  let { margin, animationDuration } = this;
  let element = $(`#${this.id}`);
  let slides = element.children();
  let pattern = /-?\d+/g;

  let lastListItem = $(`#${this.id} li`).last();
  let amountToMove = lastListItem[0].clientWidth;

  slides.each(function() {
    let currentPosition = Number(
      $(this)
        .css('right')
        .match(pattern)
    );

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

  // Disabling buttons
  this.disableButtons();
};

Slider.prototype.slideForwards = function() {
  let { margin, animationDuration } = this;
  let element = $(`#${this.id}`);
  let slides = element.children();
  let pattern = /-?\d+/g;

  let firstListItem = $(`#${this.id} li`).first();
  let amountToMove = firstListItem[0].clientWidth;

  slides.each(function() {
    let currentPosition = Number(
      $(this)
        .css('right')
        .match(pattern)[0]
    );

    $(this).css('right', currentPosition - amountToMove - margin);
  });

  // Appending the first image to the end of the slider (far left)
  let imageSource = firstListItem.children()[0].src;
  let slide = this.createSlide(imageSource);

  let positionOfAppendingSlide = 0;

  slides.each(function(index) {
    positionOfAppendingSlide += this.clientWidth;
  });

  this.appendSlide(
    slide,
    positionOfAppendingSlide + (slides.length - 1) * margin
  );

  setTimeout(() => {
    slides.first().remove();
  }, animationDuration);

  // Disabling buttons
  this.disableButtons();
};

Slider.prototype.disableButtons = function() {
  let { animationDuration } = this;
  let previousButton = $('#previous');
  let nextButton = $('#next');

  previousButton.css('background-image', `url(${buttonImages[2]})`);
  nextButton.css('background-image', `url(${buttonImages[3]})`);

  previousButton.prop('disabled', true);
  nextButton.prop('disabled', true);

  setTimeout(() => {
    previousButton.css('background-image', `url(${buttonImages[0]})`);
    nextButton.css('background-image', `url(${buttonImages[1]})`);

    previousButton.prop('disabled', false);
    nextButton.prop('disabled', false);
  }, animationDuration);
};

export default Slider;
