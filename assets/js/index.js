document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        limpaTela();
        mostraAviso('Carregando....');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0fc9eced22721a406cd13437b96e3f55&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {

            mostraResultado({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            limpaTela();
            mostraAviso('Não encontramos esta localização.');
        }

    } else {
        limpaTela();
    }
});

function mostraResultado(json) {
    
    mostraAviso('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function limpaTela() {
    mostraAviso('');
    document.querySelector('.resultado').style.display = 'none';
}

function mostraAviso(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}