const drops = [5, 40, 75, 90, 140, 200, 300, 400, 700, 1000, 2000, 3000, 4000, 999999];

function openCase() {
    document.querySelector("#case_ui").style.display = "block";
    setTimeout(function() {
        document.querySelector("#case_ui").style.left = "0%";
    }, 500);
    drops.forEach(function (d) {
        let dr = document.createElement("div");
        dr.className = "drop";
        dr.innerHTML = "<h2>" + d + "</h2>";
        document.querySelector("#possible_drops").appendChild(dr);
    });
};

function actualOpening() {
    // blur i przyciemnienie
    document.querySelector("#opening").style.display = "block";
    setTimeout(function () {
        document.querySelector("#opening").style.opacity = 1;
    }, 10);


    // generujemy arraya (series) o losowej długości (att), każda z liczb w arrayu to możliwy drop, ostatnia dodana liczba to wydropiona liczba `kasztan`ów
    let att = Math.floor(Math.random() * 100);
    // jeśli jakimś cudem losowa długość wynosiłaby 0 to próbujemy do skutku
    while (att == 0) {
        att = Math.floor(Math.random() * 100);
    };
    let series = [];

    while (series.length !== att) {
        series.push(drops[Math.floor(Math.random() * drops.length)]);
    };

    let c = 0;
    // dodawanie liczb do elementu h1 w #opening
    let x = setInterval(function () {
        if (series[c]) {
            document.querySelector("#opening h1").innerHTML += "<br>" + series[c];
            document.querySelector("#opening h1").style.bottom = c + "px";
            c += 1;
        } else {
            clearInterval(x);
            setTimeout(function () {
                let sp = document.querySelector("#opening h1").innerHTML.split("<br>");
                document.querySelector("#opening h1").innerHTML = sp[sp.length - 1];
                document.querySelector("#opening h1").style.top = "50%";
                document.querySelector("#opening h1").style.transform = "translate(-50%, -50%)";
                setTimeout(function () {
                    document.querySelector("#opening").style.opacity = 0;
                    setTimeout(function () {
                        document.querySelector("#opening").style.display = "none";
                        document.querySelector("#case_ui").style.left = "100%";
                        let newValue = series[c - 1] + parseInt(localStorage.clicks);
                        console.log(newValue);
                        localStorage.setItem("clicks", newValue.toString());
                        location.reload();
                    }, 260);
                }, 2000);
            }, 300);
        };

    }, 50);
};