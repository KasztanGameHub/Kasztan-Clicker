// Głowne skrypty
'use strict';

if (window.location.href.includes("reset=1")) {
    localStorage.clear();
}

function update() {
    localStorage.clicks = clicks;
    document.querySelector("#pts").innerHTML = localStorage.clicks
}

let clicks = 0;
if (localStorage.getItem("clicks") !== null) {
    clicks = parseInt(localStorage.clicks)
} else {
    localStorage.clicks = 0
}
if (localStorage.getItem("bought") == null) localStorage.bought = ""

update();


function kasztanAnim() {
    document.querySelector("#kasztan").style.width = "325px"
    document.querySelector("#kasztan").style.height = "325px"
    setTimeout(function () {
        document.querySelector("#kasztan").style.width = "300px"
        document.querySelector("#kasztan").style.height = "300px"
    }, 60)

    // animacja "+1"
    let p1 = document.createElement("h1");
    p1.innerHTML = "+1";
    document.querySelector("#plus1").appendChild(p1);
    p1.style.color = "black"
    p1.style.left = Math.floor(Math.random() * 250) + "px"
    p1.style.top = Math.floor(Math.random() * 250) + "px"
    setTimeout(function () {
        p1.style.top = "0px"
        p1.style.opacity = 0
        setTimeout(function () {
            p1.remove();
        }, 100)
    }, 100)
}




// funkcjonalność kursorów

let kasztanyPerSecond = 0

let KPS = setInterval(function () {
    let c = 0;
    while (c !== kasztanyPerSecond) {
        setTimeout(function () {
            clicks += 1;
            update();
            kasztanAnim();
        }, Math.floor(Math.random() * 500))
        c += 1
    }

    if (kasztanyPerSecond >= 10) {
        // pierwsze 10 kursorów po 100 kasztanów, później coraz drożej
        items[0].price = (kasztanyPerSecond / 10) * 100
        document.querySelector("#shopItem").querySelector("p").innerHTML = items[0].price + " kasztanów"
    }
}, 1000)




// sklep
let items = [{
    "name": "Kursor",
    "description": "Klika kasztana co 1 sekundę",
    "price": 100,
    "code": `kasztanyPerSecond += 1`
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
        
    }, 300000)`
}, {
    "name": "Skrzynka",
    "description": "Spróbuj swojego szczęścia otwierając skrzynkę. Możliwa strata albo zysk kasztanów.",
    "price": 1000,
    "code": "openCase();localStorage.bought = localStorage.bought.split('Skrzynka;').join('');"
}, {
    "name": "Fabryka kasztanów",
    "description": "Klika 20 kasztanów co 1 sekundę",
    "price": 2000,
    "code": `kasztanyPerSecond += 20`
},]

items.forEach(function (item) {
    let times = 0
    let e = document.createElement("div")
    e.innerHTML = `
    <h2>` + item.name + `</h2>
    <h3>` + item.description + `</h3>
    <p>` + item.price + ` kasztanów</p>`;
    e.id = "shopItem"
    e.onclick = function () {
        if (parseInt(localStorage.clicks) >= item.price) {
            times += 1
            clicks -= item.price
            localStorage.setItem("clicks", parseInt(localStorage.clicks) - item.price);
            e.querySelector("h2").innerHTML = item.name + " (" + times + "x)"
            localStorage.bought += item.name + ";"
            e.style.color = "#84ff66"
            eval(item.code)

        } else {
            e.style.color = "#cc0407"
            setTimeout(function () {
                e.style.color = "white"
            }, 1000)
        }
    }
    document.querySelector("#shop").appendChild(e)
    // mogłem tu pójść z localStorage.bought.includes, ale gdy użytkownik kupywał przedmiot więcej niż 1 raz to nie działało
    localStorage.bought.split(";").forEach(function (hhh) {
        if (hhh == item.name) {
            times += 1
            e.style.color = "#84ff66"
            eval(item.code)
            e.querySelector("h2").innerHTML = item.name + " (" + times + "x)"
        }
    })
})
