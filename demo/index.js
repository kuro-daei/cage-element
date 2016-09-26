/**
 * Interstitial Demo
 * @author Eiji Kuroda
 * @license Apache-2.0
 */

var Cage = require('../index.js');

window.cage = function(targetId){
  'use strict';
  var target = document.querySelector('#' + targetId);
  var ce = new Cage(target);
};

document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  window.cage('target');
}, false);
