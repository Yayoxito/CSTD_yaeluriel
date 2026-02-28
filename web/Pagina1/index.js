let sino = 0;

function menufindesamana() {
    if(sino == 0){
        const menuFinDeSemana = [
            "Café americano - $2.00",
            "Café con leche - $2.50",
            "Capuchino - $3.00",
            "Pastel de chocolate - $4.00",
            "Galletas de avena - $3.50",
            "Sandwich de jamón y queso - $5.00",
            "especialidad del fin de semana: Tarta de manzana - $5.00",
            "especialidad del fin de semana: Brownie de chocolate - $5.00",
            "especialidad del fin de semana: Cheesecake de fresa - $5.00",
            "Ensalada César - $6.00",
            "Agua mineral - $1.50",
            "Jugo de naranja - $2.00",
            "Refresco - $1.50",
        ];
        let menuHTML = "<h2>Menú de fin de semana</h2><ul>";
        menuFinDeSemana.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += "</ul>";
        document.querySelector(".menu").innerHTML = menuHTML;
        sino = 1;
    }else{
        const menuRegular = [
            "Café americano - $2.00",
            "Café con leche - $2.50",
            "Capuchino - $3.00",
            "Pastel de chocolate - $4.00",
            "Galletas de avena - $3.50",
            "Sandwich de jamón y queso - $5.00",
            "Ensalada César - $6.00",
            "Agua mineral - $1.50",
            "Jugo de naranja - $2.00",
            "Refresco - $1.50",
            "Batido de fresa - $3.00",
            "Batido de chocolate - $3.00",
            "Batido de vainilla - $3.00",
            "Batido de plátano - $3.00",
            "Batido de mango - $3.00",
            "Batido de piña - $3.00"
        ];
        let menuHTML = "<h2>Menú de lunes a viernes</h2><ul>";
        menuRegular.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += "</ul>";
        document.querySelector(".menu").innerHTML = menuHTML;
        sino = 0;
    }
}
let casooscuro = 0;
function modoOscuro() {
    if(casooscuro == 0){
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#fff";
        document.querySelector(".header").style.backgroundColor = "#555";
        document.querySelector(".menu").style.backgroundColor = "#555";
        document.querySelector(".content").style.backgroundColor = "#555";
        document.querySelectorAll("table, th, td").forEach(element => {
            element.style.backgroundColor = "#333";
            element.style.color = "#fff";
        });
        document.querySelectorAll("ul, li").forEach(element => {
            element.style.color = "#fff";
        });
        document.querySelectorAll("button").forEach(element => {
            element.style.backgroundColor = "#555";
            element.style.color = "#fff";
        });
        document.querySelectorAll("footer").forEach(element => {
            element.style.backgroundColor = "#555";
            element.style.color = "#fff";
        });
        casooscuro = 1;
    }else{
        document.body.style.backgroundColor = "wheat";
        document.body.style.color = "#333";
        document.querySelector(".header").style.backgroundColor = "burlywood";
        document.querySelector(".menu").style.backgroundColor = "burlywood";
        document.querySelector(".content").style.backgroundColor = "wheat";
        document.querySelectorAll("table, th, td").forEach(element => { 
            element.style.backgroundColor = "burlywood";
            element.style.color = "#333";
        });
        document.querySelectorAll("ul, li").forEach(element => {
            element.style.color = "#333";
        });
        document.querySelectorAll("button").forEach(element => {
            element.style.backgroundColor = "burlywood";
            element.style.color = "#333";
        });
        document.querySelectorAll("footer").forEach(element => {
            element.style.backgroundColor = "burlywood";
            element.style.color = "#333";
        });
        casooscuro = 0;
    }
}