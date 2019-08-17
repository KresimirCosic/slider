// This file is used to instantiate the sliders
import $ from 'jquery';
import Slider from './app/models/Slider';

function importAll(r) {
  return r.keys().map(r);
}
// Getting all images of set formats (listed in webpack.config.js) that are located in the /src/assets folder via Webpack
const images = importAll(
  require.context('./assets/', false, /\.(png|jpg|jpeg|gif)$/)
);

const app = $(document).ready(function() {
  let sliderOne = new Slider('slider-one', images, 5);
  let sliderTwo = new Slider('slider-two', images, 5);
});

export default app;
