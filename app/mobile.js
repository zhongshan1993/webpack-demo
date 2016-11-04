import './scss/main.scss';
import $ from 'jquery';
import './plugin.js';

$(document).ready(function() {
  let app = document.createElement('div');
  app.innerHTML = '<h1>Hello Mobile!</h1>';
  document.body.appendChild(app);
  $('h1').greenify();
})
