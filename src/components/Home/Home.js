import './Home.css';
import { ImSearch } from 'react-icons/im';
import { BiSolidError } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { MdOutlineLocationOff } from 'react-icons/md';
import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';

//icons import's
import _unknown from '../../assets/icons/unknown.png';
import _01d from '../../assets/icons/01d.png';
import _01n from '../../assets/icons/01n.png';
import _02d from '../../assets/icons/02d.png';
import _02n from '../../assets/icons/02n.png';
import _03d from '../../assets/icons/03d.png';
import _03n from '../../assets/icons/03n.png';
import _04d from '../../assets/icons/04d.png';
import _04n from '../../assets/icons/04n.png';
import _09d from '../../assets/icons/09d.png';
import _09n from '../../assets/icons/09n.png';
import _10d from '../../assets/icons/10d.png';
import _10n from '../../assets/icons/10n.png';
import _11d from '../../assets/icons/11d.png';
import _11n from '../../assets/icons/11n.png';
import _13d from '../../assets/icons/13d.png';
import _13n from '../../assets/icons/13n.png';
import _50d from '../../assets/icons/50d.png';
import _50n from '../../assets/icons/50n.png';


function Home(){
    //Const's
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const container_img = document.querySelector('.container-img');
    const container_temp = document.querySelector('.container-temp div');
    const temp_unit = document.querySelector('.container-temp span');
    const weather_t = document.querySelector('.weather');
    const low_high = document.querySelector(".low-high");
    const humidity = document.querySelector('.humidity');
    const spanMessage = document.querySelector('.span-message');
    const span = document.querySelector('.span');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress .progress-bar');
    const search_button = document.querySelector('.btn');
    const search_input = document.querySelector('.form-control');
    const btnLocal = document.querySelector('.btn-local');
    const btnError = document.querySelector('.btn-error');

    //Get value input
    const [search, setSearch] = useState('');

    //Api
    const Base = process.env.REACT_APP_BASE;
    const Lang = process.env.REACT_APP_LANG;
    const Units = process.env.REACT_APP_UNITS;
    const Key = process.env.REACT_APP_KEY;
    
    //Loading
    const loading = () => {
        progress.style.display = 'flex';
        progressBar.style.width = '25%';
        progressBar.innerText = '25%';

        //disable button and input of search
        search_button.disabled = true;
        search_input.disabled = true;
        btnLocal.disabled = true;
        btnError.disabled = true;
    }

    //Loading Finish
    const loadingFinish = () => {
        progress.style.display = 'none';
        progressBar.style.width = '0%';

        //enable buttons search
        search_button.disabled = false;
        search_input.disabled = false;
        btnLocal.disabled = false;
        btnError.disabled = false;
    }

    //tranform string to UpperCase
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Process Icon
    const processIcon = (iconName) => {
        switch(iconName){
            case '01d':
                return _01d;
            case '01n':
                return _01n;
            case '02d':
                return _02d;
            case '02n':
                return _02n;
            case '03d':
                return _03d;
            case '03n':
                return _03n;
            case '04d':
                return _04d;
            case '04n':
                return _04n;
            case '09d':
                return _09d;
            case '09n':
                return _09n;
            case '10d':
                return _10d;
            case '10n':
                return _10n;
            case '11d':
                return _11d;
            case '11n':
                return _11n;
            case '13d':
                return _13d;
            case '13n':
                return _13n;
            case '50d':
                return _50d;
            case '50n':
                return _50n;
            case 'unknown':
                return _unknown;
            default:
                return null;
        }
    }

    //buider date
    const dateBuider = (CurrentDate) => {
        let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']; //0 at 6
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']; //0 at 11

        let day = days[CurrentDate.getDay()];
        let date = CurrentDate.getDate();
        let month = months[CurrentDate.getMonth()];
        let year = CurrentDate.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    }

    //convert temperature
    const convertTemp = () => {
        const temperature = container_temp.innerHTML;
        const unit = temp_unit.innerHTML;

        if(unit === '°C'){
            let Fahrenheit = (temperature * 1.8) + 32;
            container_temp.innerHTML = Math.round(Fahrenheit);
            temp_unit.innerHTML = `°F`;
        }else{
            let graus = (temperature - 32) / 1.8;
            container_temp.innerHTML = Math.round(graus);
            temp_unit.innerHTML = `°C`;
        }
    }

    //insert results in the page
    const insertInThePage = (weather) => {
        //Loading Progress
        progressBar.style.width = '75%';
        progressBar.innerText = '75%';

        city.innerText = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        date.innerText = dateBuider(now);

        let iconName = weather.weather[0].icon;
        let icon = processIcon(iconName);
        container_img.innerHTML = `<img src="${icon}" width="110px" heigh="80px"></img>`;

        let temperature = `${Math.round(weather.main.temp)}`;
        container_temp.innerHTML = temperature;
        temp_unit.innerHTML = `°C`;

        let description = weather.weather[0].description;
        weather_t.innerText = capitalizeFirstLetter(description);

        low_high.innerText = `Min: ${Math.round(weather.main.temp_min)}°C / Max: ${Math.round(weather.main.temp_max)}°C`;

        humidity.innerText = `Humidade: ${weather.main.humidity}%`;
        
        //Loading-progress - finish
        progressBar.style.width = '100%';
        progressBar.innerText = '100%';
        setTimeout(loadingFinish, 1500);
    }

    //Msg span -> Error City Not Found
    const cityNotFound = () => {
        spanMessage.style.display = 'flex';
        span.innerText = ` Cidade Não Localizada!`;
        
        //Loading-progress - finish
        progressBar.style.width = '100%';
        progressBar.innerText = '100%';
        setTimeout(loadingFinish, 1500);
    }

    //Ocult Msg Span -> Sucess
    const cityFound = () => {
        const spanMessage = document.querySelector('.span-message');
        spanMessage.style.display = 'none';
    }

    //Request api
    const requestApi = async (value) => {
        //progress loading
        progressBar.style.width = '50%';
        progressBar.innerText = '50%';

        await axios.get(`${Base}weather?q=${value}&lang=${Lang}&units=${Units}&APPID=${Key}`)
        .then(function(response){
            cityFound();
            const weather = response.data;
            insertInThePage(weather);
        })
        .catch(function(error){
            cityNotFound();
        })
    }

    //Treat Value Input
    const treatValue = (search) => {
        //Loading-progress
        loading();
        
        const srt = search.toLowerCase();
        const value = srt.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        const valueTreated = value.trim();
        requestApi(valueTreated);
    }

    //Msg Span -> Error Input Null
    const inputNull = () => {
        const spanMessage = document.querySelector('.span-message');
        const span = document.querySelector('.span');

        spanMessage.style.display = 'flex';
        span.innerText = ` Nome Da Cidade...`;
    }

    //getvalue -> click mouse
    const getValue = () => {
        if(!search){
            inputNull();
        }else{
            treatValue(search);
        }
    }

    //get value -> click enter
    const handleKeyPress = (event) => {
        const keyPress = event.key; 
        
        if(keyPress === 'Enter'){
            getValue();
        }
    }

    //get name city by coords -> request
    const requestLocal = async (lat, long) => {    
        await axios.get(`${Base}weather?lat=${lat}&lon=${long}&lang=${Lang}&units=${Units}&APPID=${Key}`)
        .then(function(response){
            //get value api
            const cityByCoords = response.data.name;
            const country = response.data.sys.country;

            //const's
            const spanLocal = document.querySelector('.span-local');
            const spanMessageLocal = document.querySelector('.span-local .span');
            const search_button = document.querySelector('.btn');
            const city = document.querySelector('.city');
            
            //front-end
            spanLocal.style.display = 'flex';
            spanMessageLocal.innerText = `${cityByCoords}, ${country}`;
            
            //request -> call
            setSearch(spanMessageLocal.innerHTML);
            search_button.click();

            //verify
            if(city.innerHTML != spanMessageLocal.innerHTML){
                getLocalization();
            }else{

            }
        })
        .catch(function(error){
            //front-end
            const spanLocal = document.querySelector('.span-local');
            spanLocal.style.display = 'none';

            cityNotFound();
        })
    }

    //get Localization -> by coords
    const getLocalization = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoords, showError)
        }else{
            
        }

        function getCoords(position){
            //front-end
            const btnLocal = document.querySelector('.btn-local');
            btnLocal.style.display = 'flex';

            const btnError = document.querySelector('.btn-error');
            btnError.style.display = 'none';

            //data-request
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            requestLocal(lat, long);
        }

        function showError(){
            const btnLocal = document.querySelector('.btn-local');
            btnLocal.style.display = 'none';

            const btnError = document.querySelector('.btn-error');
            btnError.style.display = 'flex';
        }
    }

    //onload call localization
    useEffect(() => {
        getLocalization();
    }, []);

    //redirect to gitHub - CodeSource
    const RedirectToRepositore = () => {
        const Link = 'https://github.com/jtas20/Previsao';
        window.open(Link, '_blank');
    }


    return (
        <div class='container-card'>
            <div class="card mb-3 card-bootstrap text-center bg-transparent">
                <div class="card-header bg-gray title-header">
                    PREVISÃO DO TEMPO
                    <BsGithub class='icon-header' onClick={RedirectToRepositore}/>
                </div>

                <div class="card-body">
                    <div class="city">CIDADE, PAIS</div>
                    <div class="date">DATA LOCAL</div>

                    <div class="container-img">
                        <img src={_unknown} width="110px" heigh="80px"></img>
                    </div>

                    <div class='container-temp' onClick={convertTemp}>
                        <div></div>
                        <span>°C</span>
                    </div>

                    <div class="weather">
                        DESCRIÇÃO
                    </div>

                    <div class="low-high">
                        MÍNIMA-°C / MÁXIMA-°C
                    </div>

                    <div class="humidity">
                        HÚMIDADE-%
                    </div>
                </div>

                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div class='span-message'>
                    <BiSolidError class='icon-span' /> 
                    <span class='span'></span>
                </div>

                <div class='span-local'>
                    <MdLocationPin class='icon-local' /> 
                    <span class='span'>LOCAL</span>
                </div>

                <div class="card-footer bg-gray">
                    <div class="input-group mb-3">
                        <input
                            required
                            autoFocus
                            autoComplete='on'
                            type="text" 
                            class="form-control required" 
                            placeholder="Informe a Cidade..." 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2"
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={false}
                        />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2" disabled={false} onClick={getValue}>
                                <ImSearch class='icon-search' />
                            </button>

                            <button class="btn btn-local btn-outline-secondary" type="button" id="button-addon2" disabled={false} onClick={getLocalization}>
                                <MdLocationPin class='icon-search-2' />
                            </button>

                            <button class="btn btn-error btn-outline-secondary" type="button" id="button-addon2" disabled={false} onClick={getLocalization}>
                                <MdOutlineLocationOff class='icon-search-3' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home