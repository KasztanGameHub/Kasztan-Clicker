"use strict";
function gameLoader(newGame) {
    if (Modernizr.webp == true) {
        // korzystamy z webp
        if (newGame) {
            window.location = './game/index.html?reset=1&webp=true';
        } else {
            window.location = './game/index.html?reset=0&webp=true';
        }
    } else {
        // korzystamy z png/jpg
        if (newGame) {
            window.location = './game/index.html?reset=1&webp=false';
        } else {
            window.location = './game/index.html?reset=0&webp=false';
        }
    };
};