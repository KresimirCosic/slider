class Slide {
  constructor(name) {
    this.name = name;
  }
}

Slide.prototype.create = function() {
  let { name } = this;
  let li = document.createElement('li');
  let image = document.createElement('img');

  li.classList.add('slide-list-item', 'absolute');
  image.classList.add('slide-image');

  image.src = name;
  li.append(image);

  return li;
};

export default Slide;
