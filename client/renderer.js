'use strict';

/* eslint-env browser */

const { webFrame } = require('electron');

const titre_input = document.getElementById('titre_input');
const titre_render = document.getElementById('titre_render');

const details_input = document.getElementById('details_input');
const details_render = document.getElementById('details_render');

const image_bigURL_input = document.getElementById('image_bigURL_input');

const image_bigTEXT_input = document.getElementById('image_bigTEXT_input');
const image_bigTEXT_render = document.getElementById('image_bigTEXT_render');

const image_smallURL_input = document.getElementById('image_smallURL_input');

const image_smallTEXT_input = document.getElementById('image_smallTEXT_input');
const image_smallTEXT_render = document.getElementById('image_smallTEXT_render');
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

window.titre_text = "Par défaut";
window.details_text = "Par défaut";
window.image_big_key = "Par défaut";
window.image_big_words = "Par défaut";
window.image_small_key = "Par défaut";
window.image_small_words = "Par défaut";

function update() {
    window.titre_text = titre_input.value || "Par défaut"
    titre_render.innerHTML = titre_input.value || "Par défaut"
    window.details_text = details_input.value || "Par défaut"
    details_render.innerHTML = details_input.value || "Par défaut"
    window.image_big_key = image_bigURL_input.value || "Par défaut"
    window.image_big_words = image_bigTEXT_input.value || "Par défaut"
    image_bigTEXT_render.innerHTML = image_bigTEXT_input.value || "Par défaut"
    window.image_small_key = image_smallURL_input.value || "Par défaut"
    window.image_small_words = image_smallTEXT_input.value || "Par défaut"
    image_smallTEXT_render.innerHTML = image_smallTEXT_input.value || "Par défaut"
}
