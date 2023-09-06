const NameCity = document.getElementById("city");
const form = document.getElementById("buscar");

const containerCiudades = document.getElementById("box_city");
const contenedor_secundario = document.getElementById("contenedor_secundario");

const click = document.getElementById("lupa");

var fecha = new Date();
var options = { day: 'numeric', month: 'long' };
const date = document.getElementById("date").innerHTML = fecha.toLocaleDateString("en-EN", options);
// var ciudades = ["bogota", "medellin","cali", "cartagena","barranquilla"]

var ciudades = ["bogota", "medellin", "cartagena", "cucuta", "barranquilla", "bucaramanga","cali", "monteria", "santa marta", "valledupar", "manizales", "ibague", "pereira","maicao","cucuta", "villavicencio","manizale","pasto","neiva","buenaventura" ];
let fiveCities = [];




function showError(message){
    const alerta = document.createElement("p")
    contenedor_secundario.innerHTML =`<p id="p_error"> ${message}</p>` 
    
}
 

function cities(array) {
    for (let i = 0; i < array.length; i++) {
        let randomCity = Math.floor(Math.random() * array.length);
        if (!fiveCities.includes(array[randomCity]) && fiveCities.length < 5 ) {

            fiveCities.push(array[randomCity]);
            console.log(randomCity, 'randon');
            console.log(array)
            console.log(fiveCities)
        }

    }
    return fiveCities
}

let sixcities = cities(ciudades);

function ciudadesFijas() {
    sixcities.forEach(element => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=494d64b74b8b316ee8c48fb867a1a9a7&units=metric`

        fetch(url)
            .then((responde) => responde.json())
            .then((data => {
                console.log(data);
                // const tiempo = data.weather[0].main
                // console.log(tiempo);
                const temp = parseInt(data.main.temp)
                containerCiudades.innerHTML += `
                
                <div class="local">
                <div class= "coord">
                <p>Lon: ${data.coord.lon}</p>
                <p>Lat: ${data.coord.lat}</p>
                </div>
                
                <div class="border">
                    <h3>${element}  -  ${data.sys.country}</h3>
                    </div>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="130px" alt="icono">
                    
                    <div class="border">
                    <span>${data.weather[0].main}</span>
                    <p>(${data.weather[0].description})</p>
                    </div>
                    
                    <div class="border"><h1>${temp}°C</h1></div>
                    
                    
                    <div class="border">
                    <span>💧 ${data.main.humidity}%</span>
                    </div>
                    
                    </div>`
            }));
    });

}



function buscarCiudad() {

    const ciudad = NameCity.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=494d64b74b8b316ee8c48fb867a1a9a7&units=metric`

    fetch(url)
        .then((responde) => responde.json())
        .then((data => {
            console.log(data);
            if(data.cod === '404'){
                showError('Ciudad no encontrada')
            } else {
                contenedor_secundario.innerHTML = "";
                // const tiempo = data.weather[0].main
                const temp = parseInt(data.main.temp) 
                
                contenedor_secundario.innerHTML = `
                
                <div class="box">
                <div class= "coord">
                    <p>Lon: ${data.coord.lon}</p>
                    <p>Lat: ${data.coord.lat}</p>
                    </div>
                
                        <div id="exit" onclick="addDeletebtn()"> X</div>
                        <div class="border">
                             <h3>${ciudad} -  ${data.sys.country}</h3>
                        </div>
                        
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="130px" alt="icono">
    
                        <div class="border">
                            <span>${data.weather[0].main}</span>
                            <p>(${data.weather[0].description})</p>
    
                        </div>
    
                        <div class="border"><h1>${temp}°C</h1></div>
    
                        
                        <div class="border">
                        <span>💧 ${data.main.humidity}%</span>
                        </div>
                        
                    </div>`
            }
            }))
            // setTimeout(()=>{
            //     var box = document.querySelector(".box");
            //     contenedor_secundario.removeChild(box);
            // }, 5000);
};



form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(NameCity.value)
    if(NameCity.value === " "){
        showError("Error! Por favor ingrese una ciudad")
    } else {
        contenedor_secundario.innerHTML =" ";
        buscarCiudad()
        NameCity.value = " ";
    }
    
});
function addDeletebtn() {
    const exit = document.getElementById("exit");
    exit.addEventListener("click", () => {
        var box = document.querySelector(".box");
        contenedor_secundario.removeChild(box);
    })


};

ciudadesFijas();

// const link = document.querySelector(".location")


