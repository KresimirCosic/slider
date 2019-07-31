// jQuery
import $ from 'jquery';

function importAll(r) {
    return r.keys().map(r);
}
// Getting all images of set formats (listed in webpack.config.js) that are located in the /src/assets folder via Webpack
const images = importAll(require.context('./assets/', false, /\.(png|jpg|jpeg|gif)$/));

const app = $(document).ready(function() {
    // Confirming images are being processes/moved and referenced correctly in the production folder
    $.each(images, function(key, value) {
        let element = document.createElement('img');
        element.src = value;

        $('.container').append(element);
    });
})

export default app;