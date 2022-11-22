'use strict';

function wipe() {
    localStorage.clear();
    load();
}

function load() {
    window.location = './game/index.html';
}