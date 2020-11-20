let debounce = false;

function kp(event) {
    if (event.keyCode == 32 && debounce == false) {
        // spacja
        debounce = true;
        clicks += 1;
        update();
        kasztanAnim();
        setTimeout(function () {
            debounce = false;
        }, 200)
    }
}