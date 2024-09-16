// Głowne skrypty
'use strict';

let zimaActive = false;

function update() {
    if (zimaActive) {
        localStorage.clicks = Math.round(clicks * 10) / 10;
    } else {
        localStorage.clicks = Math.round(clicks);
    }
    document.querySelector("#pts").innerHTML = localStorage.clicks;
}

let clicks = 0;
if (localStorage.getItem("clicks") !== null) {
    clicks = parseInt(localStorage.clicks);
} else {
    localStorage.clicks = 0;
}
if (localStorage.getItem("bought") == null) localStorage.bought = "";

update();


let kasztanAnimVal = "+1";
let kasztanAdd = 1;

function addKasztanOnClick() {
    clicks += kasztanAdd;
    update();
    kasztanAnim();
}

function kasztanAnim() {
    document.querySelector("#kasztan").style.width = "325px";
    document.querySelector("#kasztan").style.height = "325px";
    setTimeout(function () {
        document.querySelector("#kasztan").style.width = "300px";
        document.querySelector("#kasztan").style.height = "300px";
    }, 60);

    // animacja "+1"
    let p1 = document.createElement("h1");
    p1.innerHTML = kasztanAnimVal;
    document.querySelector("#plus1").appendChild(p1);
    p1.style.color = "black";
    p1.style.left = Math.floor(Math.random() * 250) + "px";
    p1.style.top = Math.floor(Math.random() * 250) + "px";
    setTimeout(function () {
        p1.style.top = "0px";
        p1.style.opacity = 0;
        setTimeout(function () {
            p1.remove();
        }, 100)
    }, 100)
}




// funkcjonalność kursorów

let kasztanyPerSecond = 0;

let KPS = setInterval(function () {
    let c = 0;
    while (c !== kasztanyPerSecond) {
        setTimeout(function () {
            clicks += 1;
            update();
            kasztanAnim();
        }, Math.floor(Math.random() * 500))
        c += 1;
    }
}, 1000);




// sklep
let items = [{
    "name": "Kursor",
    "description": "Klika kasztana co 1 sekundę",
    "price": 100,
    "code": `kasztanyPerSecond += 1`,
    "id": "000000"
}, {
    "name": "Boost",
    "description": "Co 5 minut każdy kliknięty kasztan jest podwajany na 30 sekund.",
    "price": 500,
    "code": `
    setInterval(function() {
        document.querySelector("#b_active").style.visibility = "visible";
        document.querySelector("#plus1").setAttribute("onclick", "clicks += 2;update();kasztanAnim();");
        
        setTimeout(function() {
            document.querySelector("#plus1").setAttribute("onclick", "clicks += 1;update();kasztanAnim();");
            document.querySelector("#b_active").style.visibility = "hidden"
        }, 30000);
        
    }, 300000)`,
    "id": "000001"
}, /*{
    "name": "Skrzynka",
    "description": "Spróbuj swojego szczęścia otwierając skrzynkę. Możliwa strata albo zysk kasztanów.",
    "price": 1000,
    "code": "openCase();localStorage.bought = localStorage.bought.split('Skrzynka;').join('');",
    "id": "000002"
},*/ {
    "name": "Fabryka kasztanów",
    "description": "Klika 20 kasztanów co 1 sekundę",
    "price": 2000,
    "code": `kasztanyPerSecond += 20`,
    "id": "000003"
},];

items.forEach(function (item) {
    if (localStorage.getItem(`price${item.id}`) == null) {
        localStorage.setItem(`price${item.id}`, item.price);
    } else {
        item.price = localStorage.getItem(`price${item.id}`);
    }
});

items.forEach(function (item) {
    let times = 0;
    let e = document.createElement("div");
    e.innerHTML = `
    <h2>${item.name}</h2>
    <h3>${item.description}</h3>
    <p>${item.price} kasztanów</p>`;
    e.classList.add("shopItem");
    e.id = `shopItem-${item.id}`;
    e.onclick = function () {
        if (parseInt(localStorage.clicks) >= item.price) {
            times += 1;
            clicks -= item.price;
            localStorage.setItem("clicks", parseInt(localStorage.clicks) - item.price);
            e.querySelector("h2").innerHTML = item.name + " (" + times + "x)";
            localStorage.bought += item.name + ";";
            e.style.color = "#84ff66";
            eval(item.code);
            item.price *= 1.1;
            item.price = Math.round(item.price);
            localStorage.setItem(`price${item.id}`, item.price);
            document.querySelector(`#shopItem-${item.id}`).querySelector("p").innerText = `${item.price} kasztanów`;
        } else {
            e.style.color = "#cc0407";
            setTimeout(function () {
                e.style.color = "white";
            }, 1000);
        }
    }
    document.querySelector("#shop").appendChild(e);
    // mogłem tu pójść z localStorage.bought.includes, ale gdy użytkownik kupywał przedmiot więcej niż 1 raz to nie działało
    localStorage.bought.split(";").forEach(function (boughtItem) {
        if (boughtItem == item.name) {
            times += 1;
            e.style.color = "#84ff66";
            eval(item.code);
            e.querySelector("h2").innerHTML = item.name + " (" + times + "x)";
        }
    })
})



setInterval(function () { // losowe wybieranie eventów
    if (Math.random() > 0.75) {
        if (Math.random() > 0.5) {
            specialEventHandler("inflation");
        } else {
            specialEventHandler("storm");
        }
    } else if (Math.random() > 0.25) {
        if (Math.random() > 0.5) {
            specialEventHandler("deflation");
        } else {
            if (!zimaActive) {
                specialEventHandler("winter");
            }
        }
    }
}, 30000);

function specialEventHandler(eventid) { // funkcja uruchamiająca eventy
    if (eventid == "inflation") {
        document.querySelector(".eventmodal").style.display = "block";
        document.querySelector("#eventmodal_img").src = "./img/stonks.jpg"; // do inflacji powinno być not stonks, ale ok
        document.querySelector("#eventmodal_name").innerText = "Inflacja!";
        document.querySelector("#eventmodal_desc").innerHTML = "Ekonomia zapadła w depresję, ceny są 25% wyższe!<br>Czas trwania: 1 minuta";
        items.forEach(function (item) {
            item.price *= 1.25;
            item.price = Math.round(item.price);
            document.querySelector(`#shopItem-${item.id}`).querySelector("p").innerText = `${item.price} kasztanów`;
        });
        setTimeout(function () {
            items.forEach(function (item) {
                item.price = Math.round(item.price *= 0.80);
                document.querySelector(`#shopItem-${item.id}`).querySelector("p").innerText = `${item.price} kasztanów`;
                document.querySelector(".eventmodal").style.display = "none";
            });
        }, 60000);
    } else if (eventid == "deflation") {
        document.querySelector(".eventmodal").style.display = "block";
        document.querySelector("#eventmodal_img").src = "./img/stonks.jpg";
        document.querySelector("#eventmodal_name").innerText = "Deflacja!";
        document.querySelector("#eventmodal_desc").innerHTML = "Ekonomia ma się bardzo dobrze, ceny są 20% niższe!<br>Czas trwania: 1 minuta";
        items.forEach(function (item) {
            item.price *= 0.8;
            item.price = Math.round(item.price);
            document.querySelector(`#shopItem-${item.id}`).querySelector("p").innerText = `${item.price} kasztanów`;
        });
        setTimeout(function () {
            items.forEach(function (item) {
                item.price = Math.round(item.price *= 1.25);
                document.querySelector(`#shopItem-${item.id}`).querySelector("p").innerText = `${item.price} kasztanów`;
                document.querySelector(".eventmodal").style.display = "none";
            });
        }, 60000);
    } else if (eventid == "winter") {
        document.querySelector(".eventmodal").style.display = "block";
        document.querySelector("#eventmodal_img").src = "./img/winter.jpg";
        document.querySelector("#eventmodal_name").innerText = "Zima";
        document.querySelector("#eventmodal_desc").innerHTML = "Zima sprawia, że zarabiasz 50% mniej kasztanów za kliknięcie!<br>Czas trwania: 2 minuty";
        kasztanAdd *= 0.5;
        zimaActive = true;
        kasztanAnimVal = "+0,5";
        setTimeout(function () {
            kasztanAdd = Math.round(kasztanAdd *= 1.5);
            kasztanAnimVal = "+1";
            document.querySelector(".eventmodal").style.display = "none";
            zimaActive = false;
        }, 120000);
    } else if (eventid == "storm") {
        document.querySelector(".eventmodal").style.display = "block";
        document.querySelector("#eventmodal_img").src = "./img/storm.jpg";
        document.querySelector("#eventmodal_name").innerText = "Storm";
        document.querySelector("#eventmodal_desc").innerHTML = "Storm sprawia, że tracisz 25% swoich kasztanów!";
        let oldKasztanVal = parseInt(localStorage.getItem("clicks"));
        let newKasztanVal = Math.round(oldKasztanVal *= 0.75)
        localStorage.setItem("clicks", newKasztanVal);
        setTimeout(function () {
            document.querySelector(".eventmodal").style.display = "none";
        }, 10000)
    }
}


// przeniosłem to ze spaceEvent gdyż teraz trzeba sterować ilością kasztanow na klikniecie
let debounce = false;

function kp(event) {
    if (event.keyCode == 32 && debounce == false) {
        // spacja
        debounce = true;
        clicks += kasztanAdd;
        update();
        kasztanAnim();
        setTimeout(function () {
            debounce = false;
        }, 200)
    }
}